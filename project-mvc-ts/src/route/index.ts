import { Router } from "express";

var router = Router();

/** 导入控制器 */
import { UserController } from "../controllers/UserController";

/** 导入中间件 */
import {
  middleware_function,
  register_middleware_func,
  login_middleware_func,
} from "../middlewares/index";

let User = new UserController();

/** 白名单 */
router.post("/register", register_middleware_func, User.register);
router.post("/login", login_middleware_func, User.login);

/** 权限 */
router.post("/getQuiz", middleware_function, User.getQuiz);

export default router;
