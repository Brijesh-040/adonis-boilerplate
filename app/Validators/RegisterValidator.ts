import {
  schema,
  CustomMessages,
  rules,
  validator,
} from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class RegsiterValidator {
  constructor(protected ctx: HttpContextContract) {}

  public reporters = validator.reporters.vanilla;

  public schema = schema.create({
    // userName: schema.string({ trim: true }, [
    //   rules.minLength(3),
    //   rules.unique({ table: "users", column: "userName" }),
    // ]),
    name: schema.string({ trim: true }, [
      rules.minLength(2),
      rules.maxLength(50),
    ]),
    email: schema.string([
      rules.email(),
      rules.unique({ table: "users", column: "email" }),
    ]),
    password: schema.string({ trim: true }, [
      rules.minLength(6),
      rules.confirmed("coPassword"),
    ]),
  });

  public messages: CustomMessages = {};
}
