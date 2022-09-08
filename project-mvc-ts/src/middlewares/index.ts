import express from 'express';

const app = express();

/** 示例中间件函数 */
const middleware_function = (req: any, res: any, next: any) => {
    // ... 进行一些操作
    console.log('currency middleware...');

    next(); // 调用 next() ，Express 将调用处理链中下一个中间件函数。
};

/** 注册中间件 */
const register_middleware_func = (req: any, res: any, next: any) => {
    // ... 进行一些操作
    console.log('middleware...');
    const params = req.body;
    const { email, password, role } = params;
    console.log(!email, !password, !role, typeof role !== 'number', '0000000');
    if (!email || !password || typeof role !== 'number') {
        res.json([{ code: 415, message: 'Parameter error' }]);
        return;
    }
    next(); // 调用 next() ，Express 将调用处理链中下一个中间件函数。
};

/** 登录中间件 */
const login_middleware_func = (req: any, res: any, next: any) => {
    // ... 进行一些操作
    console.log('middleware...');
    const params = req.body;
    const { email, password, role } = params;
    if (!email || !password || typeof role !== 'number') {
        res.json([{ code: 415, message: 'Parameter error' }]);
        return;
    }
    next();
};

/** 忘记密码中间件 */
const forgetPw_middleware_func = (req: any, res: any, next: any) => {
    // ... 进行一些操作
    console.log('middleware...');
    const params = req.body;
    const { email } = params;
    if (!email) {
        res.json([{ code: 415, message: '参数错误' }]);
        return;
    }
    next();
};

/** 修改用户名中间件 */
const changeUserName_middleware_func = (req: any, res: any, next: any) => {
    // ... 进行一些操作
    console.log('middleware...');
    const params = req.body;
    const { email } = params;
    if (!email) {
        res.json([{ code: 415, message: '参数错误' }]);
        return;
    }
    next();
};

export {
    middleware_function,
    register_middleware_func,
    login_middleware_func,
    forgetPw_middleware_func,
    changeUserName_middleware_func,
};

// 用 use() 为所有的路由和动词添加该函数
app.use(middleware_function);
