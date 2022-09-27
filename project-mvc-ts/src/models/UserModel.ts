import { db } from '../mysql/index';

/* 前端传入类型 */
interface RegisterLoginState {
    email: string;
    password: string;
    role: 0 | 1;
}

interface ForgetPwState {
    email: string;
}

interface ResultState {
    code?: number;
    status?: string;
    message?: string;
    data?: any;
}

const UserRegisterModel = (param: RegisterLoginState) => {
    return new Promise((resolve, reject) => {
        const res = db.sequelizeRoot.query(`select * from fuser where email='${param.email}'`, {
            type: db.sequelizeRoot.QueryTypes.SELECT,
        });

        resolve(res);
    }).then((val: any) => {
        console.log('val111', val);

        const noRegister = val.length === 0 ? false : true;

        if (!noRegister) {
            const res = db.sequelizeRoot
                .query(
                    `insert into fuser(email,password,role) values('${param.email}','${param.password}',${param.role})`,
                    {
                        type: db.sequelizeRoot.QueryTypes.INSERT,
                    },
                )
                .then((v1: any) => {
                    console.log('val22222', v1); // [25,1]  前面是主键id
                    //!关联fuser_info
                    //!userId===id
                    if (!v1[0]) {
                        return;
                    }
                    db.sequelizeRoot
                        .query(`insert into fuser_info(userId) values('${v1[0]}')`, {
                            type: db.sequelizeRoot.QueryTypes.INSERT,
                        })
                        .then((v2: any) => {
                            console.log('val33333', v2);
                        });
                });

            console.log(res, 'AAAAAA');
            return res;
        }

        return { status: 'Error', message: 'Email has been registered' };
    });
};

const UserLoginModel = (param: RegisterLoginState) => {
    return new Promise((resolve, reject) => {
        const res = db.sequelizeRoot.query(`select * from fuser where email='${param.email}'`, {
            //! type 仔细核对
            type: db.sequelizeRoot.QueryTypes.SELECT,
        });
        resolve(res);
    }).then((val: any) => {
        if (val.length === 0) {
            return { status: 'Error', message: 'Email not registered' };
        } else {
            //! 数组第一项  這種情況只有一項  別的情況有多項目 需要具體去分析
            if (val[0].role === param.role) {
                //! role is right and after that verificat password
                const role = db.sequelizeRoot.query(
                    `select * from fuser where role='${val[0].role}'and email='${param.email}'`,
                    {
                        type: db.sequelizeRoot.QueryTypes.SELECT,
                    },
                );
                console.log('role is right', role);

                role.then((res: any) => {
                    console.log('role11111', res);
                });
                // return pormise!!!
                return role;

                // role.then((res: any) => {
                //     console.log('11111111111', res);

                //     if (res[0].password === param.password) {
                //         return;
                //     } else {
                //         return { status: 'Error', message: 'Password error!' };
                //     }
                // });
                //! 判断密码是否正确
            } else {
                return { status: 'Error', message: 'Role error!' };
            }
        }
    });
};

const UserForgetPwModel = (param: any): any => {
    console.log(param, 'param99');
    return new Promise((resolve, reject) => {
        //! 返回结果不好判断
        const res = db.sequelizeRoot.query(
            `UPDATE fuser SET password='${param.password ? param.password : 'Not yet'}' where email='${param.email}'`,
            {
                //! type 仔细核对
                type: db.sequelizeRoot.QueryTypes.UPDATE,
            },
        );
        // .then((v: any) => {
        //     console.log('2222222', v);
        // });
        resolve(res);
    }).then((val: any) => {
        console.log('111111111111', val);

        if (val[1] == 0) {
            return { status: 'Error', message: 'email error! or Same as the original password' };
        }

        return {};
    });
};

const UserModel = (param: any) => {
    return new Promise((resolve, _) => {
        const res = db.sequelizeRoot.query(`SELECT * FROM user where id=${param}`, {
            type: db.sequelizeRoot.QueryTypes.SELECT,
        });
        console.log(res, 'res');
        resolve(res);
    }).then((val: any) => {
        console.log('val', val);
        if (val.length == 0) {
            return { data: null, message: 'params not found' };
        }
        /** 不可以包裹  update  set name='闫克起',age=18 where id=3;*/
        const res = db.sequelizeRoot.query(
            `insert into books(name,price,count) values('李四',1,10)`,
            // `UPDATE user where phone='123123' where userId='${val[0].userId}'`,
            {
                /** TypeError: results.map is not a function */
                type: db.sequelizeRoot.QueryTypes.UPDATE,
            },
        );

        res.then((v: any) => {
            console.log(v, 'vvv');
        });

        return res;
    });
};

const editUserModel = (param: any) => {
    return new Promise((resolve, _) => {
        const res = db.sequelizeRoot.query(`SELECT * FROM fuser where email='${param.email}'`, {
            type: db.sequelizeRoot.QueryTypes.SELECT,
        });
        resolve(res);
    }).then((v1: any) => {
        console.log('e-----val111111', v1);

        if (v1.length == 0) {
            return { data: null, message: 'email is error' };
        }
        // 多条数据 insert into student_info(stuName,stuAge) values('zhanghua',13),('zhanghua',14),('zhanghua',15);
        const res2 = db.sequelizeRoot
            .query(
                // `insert into fuser_info(about,skill,fancy) values('${param.about ? param.about : 'Not yet'}','${
                //     param.skill ? param.skill : 'Not yet'
                // }','${param.fancy ? param.fancy : 'Not yet'}') where userId='${v1[0].id}'`,
                `UPDATE fuser_info SET about='${param.about ? param.about : 'Not yet'}', skill='${
                    param.skill ? param.skill : 'Not yet'
                }',fancy='${param.fancy ? param.fancy : 'Not yet'}' , 
                subjects='${param.subjects ? param.subjects : 'Not yet'}' , img_url='${
                    param.img_url ? param.img_url : 'Not yet'
                }' where userId='${v1[0].id}'`,
                {
                    type: db.sequelizeRoot.QueryTypes.UPDATE,
                },
            )
            .then((v2: any) => {
                console.log('e-----val22222', v2);
            });

        console.log('e-----val---1.5', res2);

        return res2;
    });
};

const sendGmailModel = (param: any): any => {
    return new Promise((resolve, reject) => {
        const res = db.sequelizeRoot
            .query(`SELECT * FROM fuser where email='${param.email}'`, {
                type: db.sequelizeRoot.QueryTypes.SELECT,
            })
            .then((v1: any) => {
                if (v1.length == 0) {
                    resolve({ code: 80010, data: null, message: 'email is error' });
                    return { data: null, message: 'email is error' };
                }
                console.log('11111', v1); //v1[0].id
                const res = db.sequelizeRoot.query(
                    `UPDATE fuser_info SET m_code='${param.code ? param.code : 'Not yet'}' where userId='${v1[0].id}'`,
                    {
                        type: db.sequelizeRoot.QueryTypes.UPDATE,
                    },
                );

                // return res;

                resolve({ code: 200, res });
            });
    }).then((val: any) => {
        console.log(val, '22222');
        if (val.code !== 200) {
            return val;
        }

        return val;
    });
};

export { UserModel, UserRegisterModel, UserLoginModel, UserForgetPwModel, editUserModel, sendGmailModel };
