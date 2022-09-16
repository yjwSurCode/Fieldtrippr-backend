import { db } from '../mysql/index';
export class MessageController {
    async send_message(req: any, res: any, next: any) {
        const params = req.body.params;

        console.log(params, 'params111');

        //  let params = {
        //     send_target: '11',
        //     receive_target: '22',
        //     create_time: new Date().getTime(),
        //     has_read: false,
        //     message: messageRef.current.value,
        // };

        // 获取参数
        // send_target 为发送用户userId
        try {
            new Promise((resolve, reject) => {
                const res = db.sequelizeRoot
                    .query(
                        `insert into chat_info(send_target,receive_target,create_time,has_read,message) 
                        values('${params.send_target}','${params.receive_target}',${params.create_time},${params.has_read},'${params.message}')`,
                        {
                            type: db.sequelizeRoot.QueryTypes.INSERT,
                        },
                    )
                    .then((v1: any) => {
                        console.log('MESSAGE1111111111111', v1);
                    });
                resolve(res);
            }).then((val: any) => {
                console.log(val, 'valvalval');
            });
        } catch (e) {
            console.log('TRY CATCH ERROR： ' + e);
            res.json([{ code: 500, message: e }]);
        }
    }
}
