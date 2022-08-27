import { Router } from 'express';
// import formidable from 'formidable';

var router = Router();

/** 导入控制器 */
import { UserController } from '../controllers/UserController';

/** 导入中间件 */
import {
    middleware_function,
    register_middleware_func,
    login_middleware_func,
    forgetPw_middleware_func,
} from '../middlewares/index';

let User = new UserController();

/** 白名单 */
router.post('/register', register_middleware_func, User.register);
router.post('/forgetPw', forgetPw_middleware_func, User.forgetPw);
router.post('/login', login_middleware_func, User.login);

// router.post('/formData', (req, res) => {
//     //创建formidable表单解析对象
//     const form = new formidable.IncomingForm();
//     //解析客户端传递过来的formData对象
//     form.parse(req, (err: any, fields: any, files: any) => {
//         //req:请求对象，err错误对象，filelds：普通请求参数的内容
//         //files：文件的内容
//         res.send(fields);
//     });
// });

/** 权限 */
router.post('/getQuiz', middleware_function, User.getQuiz);

export default router;
