import {
    UserModel,
    UserRegisterModel,
    UserLoginModel,
    UserForgetPwModel,
    UserChangeUserNameModel,
} from '../models/UserModel';

const nodemailer = require('nodemailer');

export class UserController {
    async register(req: any, res: any, next: any) {
        try {
            const data = await UserRegisterModel(req.body);
            console.log(data, 'data');
            const result = {
                code: 200,
                status: 'SUCCESS',
                ...data,
            };

            res.json([result]);
        } catch (e) {
            console.log('TRY CATCH ERROR： ' + e);
            res.json([{ code: 500, message: e }]);
        }
    }

    async login(req: any, res: any, next: any) {
        // TODO 儅程序報錯 服務不應該停止 而是報錯500
        const data = await UserLoginModel(req.body);

        // const isPromise = (val: any) => {
        //     return isObject(val) && isFunction(val.then) && isFunction(val.catch);
        // };
        console.log('22222', data, typeof data); // []
        if (data instanceof Array) {
            if (data[0].password === req.body.password) {
                res.json([
                    {
                        code: 200,
                        status: 'SUCCESS',
                    },
                ]);
                return;
            } else {
                res.json([{ status: 'Error', message: 'Password error!' }]);
                return;
            }
        }

        const result = {
            code: 200,
            status: 'SUCCESS',
            ...data,
        };

        res.json([result]);

        // res.json([{ code: 200, message: "登录成功" }]);
        // res.json([{ code: 200, message: "登录失败" }]);
    }

    async forgetPw(req: any, res: any, next: any) {
        try {
            const data = await UserForgetPwModel(req.body);

            const result = {
                code: 200,
                status: 'SUCCESS',
                ...data,
            };

            res.json([result]);
        } catch (e) {
            console.log('TRY CATCH ERROR： ' + e);
            res.json([{ code: 500, message: e }]);
        }
    }

    async changeUserName(req: any, res: any, next: any) {
        try {
            const data = await UserChangeUserNameModel(req.body);

            // TODO 具体返回 看具体业务
            const result = {
                code: 200,
                status: 'SUCCESS',
                ...data,
            };

            res.json([result]);
        } catch (e) {
            console.log('TRY CATCH ERROR： ' + e);
            res.json([{ code: 500, message: e }]);
        }
    }

    async changeGmail(req: any, res: any, next: any) {
        console.log(111, req.body.email);
        // return;
        try {
            console.log(222);
            //vcadlbkajgigruje
            //surcode
            var mailTransporter = nodemailer.createTransport({
                // host: 'smtp.gmail.com',
                // port: 465,
                // service: 'gmail',

                service: 'Gmail', // 使用了内置传输发送邮件 查看支持列表：https://nodemailer.com/smtp/well-known/
                port: 465, // SMTP 端口
                secureConnection: true, // 使用了 SSL

                // service: 'gmail',
                // host: 'smtp-mail.gmail.com',
                // port: 587,

                // host: 'smtp.gmail.com',
                // port: 587,
                // secure: false,

                // req.body.email 'yjw520yjw520@gmail.com'
                auth: { user: 'yjw520yjw520@gmail.com', pass: 'vcadlbkajgigruje' },
                debug: true,
            });

            let mailDetails = {
                from: 'yjw520yjw520@gmail.com',
                to: req.body.email, //'jocelynjocelyn0231@gmail.com',
                subject: 'Test mail',
                text: 'Node.js testing mail for 1234',
            };

            mailTransporter
                .sendMail(mailDetails)
                .then((info: any) => {
                    console.log({ info });
                    res.json([{ code: 200, message: 'Email sent successfully' }]);
                })
                .catch((err: any) => {
                    console.log({ err });
                    res.json([{ code: 80010, message: 'Error Occurs' }]);
                });

            // mailTransporter.sendMail(mailDetails, function (err: any, data: any) {
            //     if (err) {
            //         console.log('Error Occurs');
            //     } else {
            //         console.log('Email sent successfully');
            //     }
            // });
        } catch (e) {
            console.log('TRY CATCH ERROR： ' + e);
            res.json([{ code: 500, message: e }]);
        }

        // try {
        //     const data = await UserChangeUserNameModel(req.body);

        //     // TODO 具体返回 看具体业务
        //     const result = {
        //         code: 200,
        //         status: 'SUCCESS',
        //         ...data,
        //     };

        //     res.json([result]);
        // } catch (e) {
        //     console.log('TRY CATCH ERROR： ' + e);
        //     res.json([{ code: 500, message: e }]);
        // }
    }

    async getQuiz(req: any, res: any, next: any) {
        const param = req.body;
        const result = await UserModel(param);
        console.log('result');
        res.json([{ date: result }]);
    }
}
