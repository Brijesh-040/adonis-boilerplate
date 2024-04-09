import {
  schema,
  CustomMessages,
  rules,
  validator,
} from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class RegsiterValidator {
  constructor(protected ctx: HttpContextContract) {}

  public reporter = validator.reporters.vanilla;

  public schema = schema.create({
    // user_name: schema.string({ trim: true }, [
    //   rules.minLength(3),
    //   rules.unique({ table: "users", column: "user_name" }),
    // ]),
    name: schema.string({ trim: true }, [
      rules.minLength(2),
      rules.maxLength(50),
    ]),
    email: schema.string({ trim: true }, [
      rules.email(),
      rules.unique({ table: "users", column: "email" }),
    ]),
    password: schema.string({ trim: true }, [
      rules.minLength(6),
      rules.confirmed("coPassword"),
    ]),
  });

  public messages: CustomMessages = {
    "email.unique": "{{field}} is not available.",
  };
}
