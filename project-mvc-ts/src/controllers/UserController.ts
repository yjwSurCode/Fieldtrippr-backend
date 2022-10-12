import {
    UserModel,
    UserRegisterModel,
    UserLoginModel,
    UserForgetPwModel,
    editUserModel,
    obtainUserInfoModel,
    sendGmailModel, saveQuestionAnswerModel, updateQuestionAnswerModel, getQuestionAnswerModel, getQuestionAnswerModelByStudent, getQuestionAnswerModelById, updateQuestionAnswerModelById, deleteQuestionAnswerModelById,
} from '../models/UserModel';

const nodemailer = require('nodemailer');

export class UserController {
    async register(req: any, res: any, next: any) {
        try {
            const data = await UserRegisterModel(req.body);
            console.log(data, 'data-register');
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
        //!!!!! TODO 儅程序報錯 服務不應該停止 而是報錯500
        const data = await UserLoginModel(req.body);

        console.log('22222', data, typeof data); // []
        if (data instanceof Array) {
            if (data[0].password === req.body.password) {
                res.json([
                    {
                        code: 200,
                        status: 'SUCCESS',
                        userId: data[0].id,
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

    async editUser(req: any, res: any, next: any) {
        try {
            const data = await editUserModel(req.body);

            console.log('e-----333333333', data);
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

    async obtainUserInfo(req: any, res: any, next: any) {
        try {
            const data = await obtainUserInfoModel(req.body);

            console.log('e-----333333333', data);
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

    async sendGmail(req: any, res: any, next: any) {
        console.log(111, req.body.email);

        const radom = Math.floor(Math.random() * (9999 - 1000)) + 1000;

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
                to: req.body.email,
                subject: 'Test mail',
                text: `The verification code is ${radom}`,
            };

            mailTransporter
                .sendMail(mailDetails)
                .then(async (info: any) => {
                    console.log(info, 'sendMail');
                    const data = await sendGmailModel({ email: req.body.email, code: 1234 });
                    console.log('333333', data);
                    res.json([
                        { code: 200, message: 'Verification code has been sent, please wait patiently', ...data },
                    ]);
                })
                .catch((err: any) => {
                    console.log(err, 'err');
                    res.json([{ code: 80010, message: 'Error Occurs' }]);
                });
        } catch (e) {
            console.log('TRY CATCH ERROR： ' + e);
            res.json([{ code: 500, message: e }]);
        }
    }

    async getQuiz(req: any, res: any, next: any) {
        const param = req.body;
        const result = await UserModel(param);
        console.log('result');
        res.json([{ date: result }]);
    }

    async saveQuestionAnswer(req: any, res: any, next: any) {
        try {

            const data = req.body;
            const result = await saveQuestionAnswerModel(data)
            console.log('saveQuestionAnswer--result', result)
            res.json([{ code: 200, message: 'success', data: result }])
        } catch (ex) {
            console.log('error', ex);
            res.json([{ code: 500, message: ex }]);
        }
    }

    async updateQuestionAnswer(req: any, res: any, next: any) {
        try {
            const data = req.body;
            await updateQuestionAnswerModel(data)
            res.json([{ code: 200, message: 'success' }])
        } catch (ex) {
            console.log('error', ex);
            res.json([{ code: 500, message: ex }]);
        }
    }

    async updateQuestionAnswerById(req: any, res: any, next: any) {
        try {
            const data = req.body;
            const { id } = req.params;

            await updateQuestionAnswerModelById({ ...data, id })
            res.json([{ code: 200, message: 'success' }])
        } catch (ex) {
            console.log('error', ex);
            res.json([{ code: 500, message: ex }]);
        }
    }

    async deleteQuestionAnswerById(req: any, res: any, next: any) {
        try {
            const data = req.body;
            const { id } = req.params;
            await deleteQuestionAnswerModelById({ ...data, id })
            res.json([{ code: 200, message: 'success' }])
        } catch (ex) {
            console.log('error', ex);
            res.json([{ code: 500, message: ex }]);
        }
    }


    async getQuestionAnswer(req: any, res: any, next: any) {
        try {
            const rows = await getQuestionAnswerModel(req.query)
            res.json([{ code: 200, message: 'success', data: rows }])
        } catch (ex) {
            console.log('error', ex);
            res.json([{ code: 500, message: ex }]);
        }
    }

    async getQuestionAnswerById(req: any, res: any, next: any) {
        try {
            const rows = await getQuestionAnswerModelById(req.params)
            res.json([{ code: 200, message: 'success', data: rows }])
        } catch (ex) {
            console.log('error', ex);
            res.json([{ code: 500, message: ex }]);
        }
    }

    async getQuestionAnswerByStudent(req: any, res: any, next: any) {
        try {
            const rows = await getQuestionAnswerModelByStudent(req.query)
            res.json([{ code: 200, message: 'success', data: rows }])
        } catch (ex) {
            console.log('error', ex);
            res.json([{ code: 500, message: ex }]);
        }
    }

}

