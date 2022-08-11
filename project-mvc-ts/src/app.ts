import * as fs from "fs";
import * as path from "path";
import * as bodyParser from "body-parser";
import express from "express";
import router from "./route/index";
import { Server } from "socket.io";

const server = require("http").createServer();
const io = new Server(server);

const { expressjwt: jwt } = require("express-jwt");
/** 与生成token的密钥要一致! */
const SECRET_KEY = "login-surcode";

const app = express();
/* bodyParser 使用bodyParser 解析post请求传递过来的参数 */
app.use(bodyParser.json());
app.use(express.json({ limit: "2100000kb" }));

/* 跨域配置 */
app.use((req: any, res: any, next: any) => {
  console.log(req.url);
  res.append("Access-Control-Allow-Origin", "*");
  res.append("Access-Control-Allow-Origin-Type", "*");
  next();
});

/** 使用expressJWT 验证token是否过期 */
// app.use(
//   jwt({
//     secret: SECRET_KEY,
//     algorithms: ["HS256"],
//   }).unless({
//     /** 指定路径不经过Token解析 */
//     path: ["/register", "/login", "/"],
//   })
// );

/** 路由 */
// app.use("/", router);

/** 静态文件夹 */
// app.set("public", __dirname + "/public");

app.use(express.static("public"));

app.get("/index", function (req, res) {
  res.sendFile(path.join(__dirname, "../public", "index.html"));
});

// app.use("/static", express.static("public"));
// console.log(express.static(__dirname + "/"));

io.on("connection", (socket) => {
  socket.emit("success", "连接到服务器");

  socket.on("disconnect", () => {
    io.emit("quit", socket.id);
  });
});

app.listen(3000, () => {
  console.log(`App runing at http://localhost:3000`);
});
