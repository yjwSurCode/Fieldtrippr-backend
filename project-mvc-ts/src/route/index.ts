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

router.post('/open/tender/apply/purchaseType', (req, res) => {
    res.send([{ msg: '666777' }]);
});

router.post('/openApi/openTender/fileUpload', upload.array('file', 12), (req: any, res) => {
    console.log(req.files, '00000', req.files[0].originalname);
    // //创建formidable表单解析对象
    // const form = new formidable.IncomingForm();
    // //解析客户端传递过来的formData对象
    // form.parse(req, (err: any, fields: any, files: any) => {
    //     //req:请求对象，err错误对象，filelds：普通请求参数的内容
    //     //files：文件的内容
    //     console.log(err, fields, files, '1111');
    //     res.send({ code: 200, msg: '1123312', data: { fileName: '错误.docx' } });
    //     // res.send(fields);
    // });

    if (req.files[0].originalname === 'yuanxin.png') {
        setTimeout(() => {
            res.send({
                code: 200,
                msg: 'success',
                data: {
                    fileName: req.files[0].originalname.toString(),
                    url: '/shop-invite-api/2593d35f-dd6c-41d6-8e9f-028e037202bf.docx',
                },
            });
        }, 2000);
    } else {
        setTimeout(() => {
            res.send({
                code: 80003,
                msg: '文件上传失败',
                data: {
                    fileName: req.files[0].originalname.toString(),
                },
            });
        }, 2000);
    }
});

/** 权限 */
router.post('/getQuiz', middleware_function, User.getQuiz);

export default router;
