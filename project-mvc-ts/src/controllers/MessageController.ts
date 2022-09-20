import { db } from '../mysql/index';
export class MessageController {
    async send_message(req: any, RES: any, next: any) {
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
                // ONE STEP 判断用户id是否存在
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
                        //判断
                        RES.json([{ code: 200, message: 'success' }]);
                    });
                resolve(res);
            }).then((val: any) => {
                console.log(val, 'valvalval');
            });
        } catch (e) {
            console.log('TRY CATCH ERROR： ' + e);
            RES.json([{ code: 500, message: e }]);
        }
    }

    async obtain_message(req: any, RES: any, next: any) {
        const params = req.body.params;

        console.log(params, 'params111');

        //  let params = {
        //     current_user_id: '11',
        //     target_id: '22',
        // };
        try {
            new Promise((resolve, reject) => {
                const res = db.sequelizeRoot
                    .query(
                        `select * from chat_info where send_target='${params.current_user_id}'and receive_target='${params.target_id}'`,
                        {
                            type: db.sequelizeRoot.QueryTypes.SELECT,
                        },
                    )
                    .then((v1: any) => {
                        console.log('MESSAGE1111111111111', v1);

                        RES.json([{ code: 200, message: 'success', data: v1 }]);
                    });

                resolve(res);
            }).then((val: any) => {
                console.log(val, 'valvalval');
            });
        } catch (e) {
            console.log('TRY CATCH ERROR： ' + e);
            RES.json([{ code: 500, message: e }]);
        }
    }
}
