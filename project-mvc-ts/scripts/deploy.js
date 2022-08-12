/* eslint-disable @typescript-eslint/no-var-requires */
const request = require('urllib');
const compressing = require('compressing');
const path = require('path');
const fse = require('fs-extra');
const pkg = require('../package.json');

const ROUTES = '/a'  // = require('../src/pages/routes.json');
const ENV = process.env.PROJECT_ENV || 'beta';
const API_HOST = 'http://api-htdocs.beta1.fn:10001';
const REMOTE_PATH = '/act/htm/fresh-cms-v2';
const DIST_PATH = path.join(__dirname, '../.temp');
const PROJECT_PATH = path.join(DIST_PATH, `./${pkg.name}`);
const ZIP_PATH = path.join(DIST_PATH, `./${pkg.name}.zip`);

function sleep(seconds) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, seconds * 1000);
    });
}

async function upload(zip) {
    const host = API_HOST;
    const env = ENV;
    const remotePath = REMOTE_PATH;

    const executeResp = await request.curl(
        `${host}/api/csl/task/execute/cms-static?env=${env}&path=${encodeURIComponent(remotePath)}`,
        {
            method: 'POST',
            files: zip,
        },
    );

    const executeRes = JSON.parse(Buffer.from(executeResp.data).toString());

    if (executeRes.isError) {
        throw new Error(`execute fail: ${executeRes.error}`);
    }

    const taskId = executeRes.value;
    let offset = 0;

    for (let i = 0; i < 10000000; i++) {
        await sleep(1);

        const taskLogResp = await request.curl(
            `${host}/api/csl/task/query?taskId=${encodeURIComponent(taskId)}&page=${offset}-10`,
            {
                method: 'GET',
            },
        );

        const taskLogRes = JSON.parse(Buffer.from(taskLogResp.data).toString());

        if (taskLogRes.isError) {
            throw new Error(`execute query fail: ${taskLogRes.error}`);
        }

        const { taskStatus, taskLogs } = taskLogRes.value;

        for (const { level, message, context, created_at } of taskLogs) {
            console.log(`${created_at} [${level}] ${message}`);

            for (const log of context) {
                console.log(`  ${log}`);
            }
        }

        // 成功
        if (taskStatus === 2) {
            console.log('execute success');
            return;
        } else if (taskStatus === 3) {
            throw new Error('execute error');
        } else {
            offset += taskLogs.length;
        }
    }
}

const template = (data) => `
<title>${data.title}</title>
<script>
;(function () {
	window.FN = window.FN || {};

	FN.ROUTE_ENTRY = '${data.entry}';
	FN.ROUTE_PATHNAME = '${data.pathname}';
})();
</script>
`;

async function buildEntries() {
    const src = path.join(PROJECT_PATH, 'index.html');
    const html = await fse.readFile(src, 'utf-8');

    const build = async (entry, entryData) => {
        for (const [pathname, pathnameData] of Object.entries(entryData)) {
            const dest = path.join(PROJECT_PATH, `${entry}-${pathname}.html`);

            const injection = template({
                title: typeof pathnameData === 'string' ? pathnameData : pathnameData.title || 'title',
                entry,
                pathname,
            });

            const source = html.replace(/<!--\s*@@injection@@\s*-->/, injection);

            console.log(`building route: ${dest}`);

            await fse.writeFile(dest, source, {
                encoding: 'utf-8',
            });
        }
    };

    for (const [entryName, entryParams] of Object.entries(ROUTES)) {
        await build(entryName, entryParams);
    }

    await fse.remove(src);
    await compressing.zip.compressDir(PROJECT_PATH, ZIP_PATH);
    return ZIP_PATH;
}

(async () => {
    console.log('deploy: ' + ENV);
    const zip = await buildEntries();
    await upload(zip);
})()
    .then(() => {
        process.exit(0);
    })
    .catch((e) => {
        console.error(e);
        process.exit(-1);
    });
