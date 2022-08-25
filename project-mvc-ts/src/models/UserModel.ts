import { db, Order } from '../mysql/index';

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
                    `insert into fuser(email,password,role) values('${param.email}','${param.password}','${param.role}')`,
                    {
                        type: db.sequelizeRoot.QueryTypes.INSERT,
                    },
                )
                .then((v: any) => v);

            // const a = res.then((v: any) => v);

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
            //! 数组第一项
            if (val[0].role === param.role) {
                //! role is right and after that verificat password
                const role = db.sequelizeRoot.query(
                    `select * from fuser where role='${val.role}'and email='${param.email}'`,
                    {
                        type: db.sequelizeRoot.QueryTypes.SELECT,
                    },
                );
                console.log('role is right', role);

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

const UserForgetPwModel = (param: ForgetPwState): Promise<ResultState> => {
    console.log(param, 'param99');
    return new Promise((resolve, reject) => {
        const res = db.sequelizeRoot.query(`select * from fuser where email='${param.email}'`, {
            //! type 仔细核对
            type: db.sequelizeRoot.QueryTypes.SELECT,
        });
        resolve(res);
    }).then((val: any) => {
        return { status: 'Error', message: 'Role error!' };
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

export { UserModel, UserRegisterModel, UserLoginModel, UserForgetPwModel };
