import { Router } from 'express';
import formidable from 'formidable';
import multer from 'multer';
import utf8 from 'utf8'; /** npm i --save-dev @types/utf8 */

// const utf8 = require('utf8');
// const multer = require('multer');

// 文件上传模块
// 配置文件名称以及文件存储路径
const storage = multer.diskStorage({
    // 配置文件存储路径
    destination: (req: any, file: any, cb: any) => {
        // 文件上传到当前文件夹的 uploads目录下
        cb(null, __dirname + '/uploads');
    },
    // 配置文件名
    filename: (req: any, file: any, cb: any) => {
        cb(null, utf8.decode(file.originalname)); // utf8.decode(str)  解决中文的文件名乱码问题
    },
});

const upload = multer({
    dest: 'uploads/',
    storage: storage,
});

// const upload = multer({ storage: storage });

var router = Router();

/** 导入控制器 */
import { UserController } from '../controllers/UserController';
import { MessageController } from '../controllers/MessageController';

/** 导入中间件 */
import {
    middleware_function,
    register_middleware_func,
    login_middleware_func,
    forgetPw_middleware_func,
    changeUserName_middleware_func,
    sendGmail_middleware_func,
    sendMessage_middleware_func,
    obtainMessage_middleware_func,
    obtain_userId_middleware_func,
} from '../middlewares/index';

let User = new UserController();

let Message = new MessageController();

/** 白名单 */
router.post('/register', register_middleware_func, User.register);
router.post('/login', login_middleware_func, User.login);

router.post('/forgetPw', forgetPw_middleware_func, User.forgetPw);

//编辑用户信息
router.post('/editUser', changeUserName_middleware_func, User.editUser);

//获取所有用户信息
router.post('/obtain_userInfo', User.obtainUserInfo);

router.post('/send_gmail', sendGmail_middleware_func, User.sendGmail);

router.post('/send_message', sendMessage_middleware_func, Message.send_message);

//学生先获取所有老师的userId  必须传入role
router.post('/obtain_userId', obtain_userId_middleware_func, Message.obtain_userId);

//老师根据userId获取 message   获取聊天记录接口
router.post('/obtain_message', obtainMessage_middleware_func, Message.obtain_message);

router.post('/teach/questionAnswer', obtainMessage_middleware_func, User.saveQuestionAnswer);
router.put('/teach/questionAnswer', obtainMessage_middleware_func, User.updateQuestionAnswer);
router.put('/teach/questionAnswer/:id',obtainMessage_middleware_func, User.updateQuestionAnswerById);
router.delete('/teach/questionAnswer/:id',obtainMessage_middleware_func, User.deleteQuestionAnswerById);
router.get('/teach/questionAnswer', User.getQuestionAnswer);
router.get('/teach/questionAnswer/:id', User.getQuestionAnswerById);
// 
router.get('/student/questionAnswer', User.getQuestionAnswerByStudent);



router.post('/formData', (req, res) => {
    //创建formidable表单解析对象
    const form = new formidable.IncomingForm();
    //解析客户端传递过来的formData对象
    form.parse(req, (err: any, fields: any, files: any) => {
        //req:请求对象，err错误对象，filelds：普通请求参数的内容
        //files：文件的内容
        res.send(fields);
    });
});

/** 权限 */
router.post('/getQuiz', middleware_function, User.getQuiz);

export default router;
