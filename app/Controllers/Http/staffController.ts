import { rules, schema, validator } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Staff from "App/Models/Staff";

export default class staffController {
  public async index({ response }: HttpContextContract) {
    try {
      const stffs = await Staff.query().select("*");
      return response.status(200).send(stffs);
    } catch (error) {
      console.log("error: ", error);
      return response.status(500).json({ message: "Internal Server Error" });
    }
  }

  public async store({ request, response }: HttpContextContract) {
    const payload = await request.validate({
      schema: schema.create({
        name: schema.string({}, [rules.minLength(2)]),
        role: schema.string({}, []),
        address: schema.string({}, []),
        city: schema.string({}, []),
        state: schema.string({}, []),
        country: schema.string({}, []),
        salary: schema.number([]),
      }),
      reporter: validator.reporters.vanilla,
    });
    try {
      const product = await Staff.create(payload);
      return response
        .status(201)
        .json({ message: "product added successfully", data: product });
    } catch (error) {
      console.log("error: ", error);
      return response
        .status(400)
        .json({ message: "Please enter valid details" });
    }
  }

  public async show({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
