import { schema, rules, validator } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import RegsiterValidator from "App/Validators/RegisterValidator";
import User from "App/Models/User";

export default class AuthController {
  public async login({ request, response, auth }: HttpContextContract) {
    const payload = await request.validate({
      schema: schema.create({
        email: schema.string({}, [rules.email()]),
        password: schema.string({}, []),
      }),
      reporter: validator.reporters.vanilla,
    });
    try {
      const token = await auth
        .use("api")
        .attempt(payload.email.toLowerCase(), payload.password);
      return response
        .status(200)
        .json({ messsage: "Logged in succesfully", token });
    } catch (error) {
      return response.status(400).json({ message: "Invliad Credentails" });
    }
  }

  public async register({ request, response }: HttpContextContract) {
    const payload = await request.validate(RegsiterValidator);
    console.log('payload: >>>>>>>>>>>>>>>>', payload);
    try {
      await User.create(payload);
      return response
        .status(200)
        .json({ message: "Account Created successfully" });
    } catch (error) {
        console.log('error: ', error);
      return response.status(400).json({ message: "Please enter valid details" });
    }
  }
}
