import {
  UserModel,
  UserRegisterModel,
  UserLoginModel,
} from "../models/UserModel";

export class UserController {
  async register(req: any, res: any, next: any) {
    try {
      const data = await UserRegisterModel(req.body);
      console.log(data, "data");

      const result = {
        code: 200,
        status: "SUCCESS",
        ...data,
      };

      res.json([result]);
    } catch (e) {
      console.log("TRY CATCH ERROR： " + e);
      res.json([{ code: 500, message: e }]);
    }
  }

  async login(req: any, res: any, next: any) {
    const data = await UserLoginModel(req.body);

    const result = {
      code: 200,
      status: "SUCCESS",
      ...data,
    };

    res.json([result]);

    // res.json([{ code: 200, message: "登录成功" }]);
    // res.json([{ code: 200, message: "登录失败" }]);
  }

  async getQuiz(req: any, res: any, next: any) {
    const param = req.body;
    const result = await UserModel(param);
    console.log("result");
    res.json([{ date: result }]);
  }
}
