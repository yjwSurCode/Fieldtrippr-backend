const esbuild = require("esbuild");
const fs = require("fs");
const path = require("path");

const outDirectory = "public";

//clear out any old JS or CSS
fs.readdir(outDirectory, (err, files) => {
    if (err) throw err;
    for (const file of files) {
        if (
            file.endsWith(".js") ||
            file.endsWith(".css") ||
            file.endsWith(".js.map")
        ) {
            fs.unlink(path.join(outDirectory, file), (err) => {
                if (err) throw err;
            });
        }
    }
});

//defaults to build
let config = "-build";

if (process.argv.length > 2) {
    config = process.argv[2];
}

console.log(config, 'config')

config == "-watch" &&
    esbuild.build({
        // pass any options to esbuild here...
        entryPoints: ["./client/app.jsx"],
        outdir: outDirectory,
        bundle: true,
        inject: ["./scripts/react-shim.js"],
        define: { "process.env.NODE_ENV": '"production"' },
        sourcemap: true,
        minify: false,
        watch: true,
    });

config == "-build" &&
    esbuild.build({
        // pass any options to esbuild here...
        entryPoints: ["./client/app.jsx"],
        outdir: outDirectory,
        bundle: true,
        inject: ["./scripts/react-shim.js"], //为了解放我们的双手，esbuild提供了inject，这样我们就不需要每一个jsx都引入selfCreateElement了
        define: { "process.env.NODE_ENV": '"production"' },
        minify: true,
    }) &&
    console.log("building");

// Run a local web server with livereload when -watch is set
// config == "-watch" && serve();

// async function serve() {
//   console.log("running server from: http://localhost:8080/");
//   const servor = require("servor");
//   await servor({
//     browser:true,
//     root: outDirectory,
//     port: 8080,
//   });
// }
