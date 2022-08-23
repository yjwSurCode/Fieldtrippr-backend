const http = require('http');
const path = require('path');
const fs = require('fs');
const formidable = require('formidable');
const log = console.log;

// https://juejin.cn/post/6858632627239419918

const port = 3000; // 运行端口
const isAllowCoverageFile = false; // 是否允许覆盖同名文件
const uploadDir = path.join(process.cwd(), '/uploads/'); // 保存上传文件的目录, process.cwd()返回当前的工作目录

// 发送页面
function sendPage(res, path, statusCode = 200) {
    res.writeHead(statusCode, { 'Content-Type': 'text/html;charset=UTF-8' });
    fs.createReadStream(path).pipe(res);
}

/**
 * 同步递归创建路径
 * fs.mkdirSync(fileDir)要求路径的父级存在才能创建, 否则报错.
 * 注: NodeJS 10以后的版本，fs.mkdir已经增加递归选项:
 * fs.mkdir('/home/test1/test2', { recursive: true }, (err) => {})
 *
 * @param  {string} dir   处理的文件路径(不是文件夹路径)
 * @param  {function} cb  回调函数
 */
function mkdirSync(dir, cb) {
    let pathinfo = path.parse(dir);
    if (!fs.existsSync(pathinfo.dir)) {
        mkdirSync(pathinfo.dir, function () {
            console.log('创建文件夹: ' + pathinfo.dir);
            fs.mkdirSync(pathinfo.dir);
        });
    }
    cb && cb();
}

// 如果uploadDir目录不存在就创建目录
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// 上传文件
function uploadFile(req, res) {
    console.log('上传文件');
    res.writeHead(200, { 'content-type': 'text/plain;charset=UTF-8' });

    let form = new formidable.IncomingForm();
    form.uploadDir = uploadDir; // 保存上传文件的目录
    form.multiples = true; // 设置为多文件上传
    form.keepExtensions = true; // 保持原有扩展名
    form.maxFileSize = 10 * 1024 * 1024 * 1024; // 限制上传文件最大为10GB

    // 文件大小超过限制会触发error事件
    form.on('error', function (e) {
        console.log('文件大小超过限制, error: ', e);
        res.writeHead(400, { 'content-type': 'text/html;charset=UTF-8' });
        res.end('文件大小超过10GB, 无法上传');
    });

    form.on('end', () => {
        res.end('文件全部上传成功!');
    });

    form.parse(req, function (err, fields, files) {
        if (err) {
            console.log('err: ', err);
            res.writeHead(500, { 'content-type': 'text/html;charset=UTF-8' });
            res.end('上传文件失败: ' + JSON.stringify(err));
            return;
        }

        // console.log('files:\n', files);
        for (let key in files) {
            rename(files[key]);
        }

        // 文件会被formidable自动保存, 而且文件名随机, 因此保存后建议重命名
        function rename(fileItem) {
            // 单文件上传时fileItem为对象, 多文件上传时fileItem为数组,
            // 单文件上传时也将fileItem变成数组统一当做多文件上传处理;
            let fileArr = fileItem;
            if (Object.prototype.toString.call(fileItem) === '[object Object]') {
                fileArr = [fileItem];
            }

            for (let file of fileArr) {
                let fileName = file.name; // 上传文件夹时文件名可能包含上传的文件夹路径
                console.log('上传文件名: ', fileName);

                let suffix = path.extname(fileName); // 文件后缀名

                let oldPath = file.path; // formidable自动保存后的文件路径
                let newPath = path.join(uploadDir, fileName);

                // log('oldPath', oldPath)
                // log('newPath', newPath)

                // 防止路径不存在
                mkdirSync(newPath);

                // 如果不允许覆盖同名文件
                if (!isAllowCoverageFile) {
                    // 并且文件已经存在，那么在文件后面加上时间戳和随机数再加文件后缀
                    if (fs.existsSync(newPath)) {
                        newPath = newPath + '-' + Date.now() + '-' + Math.trunc(Math.random() * 1000) + suffix;
                    }
                }

                fs.rename(oldPath, newPath, function (err) {
                    if (err) {
                        log(err);
                    }
                });
            }
        }
    });
}

let server = http.createServer(function (req, res) {
    let url = decodeURI(req.url);
    console.log('url: ', url);

    let method = req.method.toLowerCase();

    let parameterPosition = url.indexOf('?');
    if (parameterPosition > -1) {
        url = url.slice(0, parameterPosition); // 去掉url中的参数部分
    }

    if (url === '/') {
        sendPage(res, './index.html');
        return;
    }

    if (url === '/uploadFile' && method === 'post') {
        // 上传文件
        uploadFile(req, res);
    }
});

server.listen(port);
console.log('http://localhost:' + port);

// 异常处理
process.on('uncaughtException', function (err) {
    if (err.code == 'ENOENT') {
        console.log('no such file or directory: ', err.path);
    } else {
        console.log(err);
    }
});

process.on('SIGINT', function () {
    process.exit();
});
process.on('exit', function () {
    console.log('exit');
});
