import * as fs from 'fs';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import express from 'express';
import router from './route/index';
import { Server } from 'socket.io';

const { expressjwt: jwt } = require('express-jwt');
/** 与生成token的密钥要一致! */
const SECRET_KEY = 'login-surcode';

const app = express();

/** 设置端口 */
app.set('port', process.env.PORT || 3000);

/* bodyParser 使用bodyParser 解析post请求传递过来的参数 */
app.use(bodyParser.json());
app.use(express.json({ limit: '2100000kb' }));

/* 跨域配置 */
app.use((req: any, res: any, next: any) => {
    console.log(req.url);
    res.append('Access-Control-Allow-Origin', '*');
    res.append('Access-Control-Allow-Origin-Type', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
});

/** 使用expressJWT 验证token是否过期 */
// app.use(
//     jwt({
//         secret: SECRET_KEY,
//         algorithms: ['HS256'],
//     }).unless({
//         /** 指定路径不经过Token解析 */
//         path: ['/register', '/login', '/html'],
//     }),
// );

/** 路由 */
app.use('/', router);

/** 静态文件夹 */
app.use(express.static('public'));

//! ONE
// app.use(express.static("public"));
// app.get("/html", function (req, res) {
//   res.sendFile(path.join(__dirname, "../public", "index.html"));
// });

//! TWO
app.get('/html', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

//!THREE
// app.use("/static", express.static("public"));
// console.log(express.static(__dirname + "/"));

// app.use(function (req, res, next) {
//   var err = new Error("Not Found"); // line 99
//   next(err);
// });

// io.engine.on("connection_error", (err: any) => {
//   if (err.code === 5) {
//     // Unsupported protocol version
//     console.log("error111111111111111");
//   }
// });

var server = app.listen(app.get('port'), process.env.IP || '0.0.0.0', () => {
    console.log(`App runing at http://localhost:3000`, app.get('port'));
});

//! ES6
const io = new Server(server, {
    cors: {
        origin: '*',
    },
});

//listen on every connection
io.on('connection', (socket: any) => {
    console.log(socket, 'New user connected');

    //default username
    socket.username = 'Anonymous';

    //listen on change_username
    socket.on('change_username', (data: { username: unknown }) => {
        socket.username = data.username;
    });

    //listen on new_message
    socket.on('new_message', (data: any) => {
        //broadcast the new message
        io.sockets.emit('new_message', {
            message: data.message,
            username: socket.username,
        });
    });

    socket.to('hAshHL9eea3SL11-AAAH').emit('hey', 'I just met you');

    //listen on typing
    socket.on('typing', (data: any) => {
        socket.broadcast.emit('typing', { username: socket.username });
    });
});
