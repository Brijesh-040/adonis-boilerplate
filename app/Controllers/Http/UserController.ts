import { rules, schema, validator } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import User from "App/Models/User";

export default class UserController {
  public async getUser({ auth, response }: HttpContextContract) {
    const user = auth.use("api").user;
    return response.status(201).send(user);
  }

  public async logout({ auth, response }: HttpContextContract) {
    await auth.use("api").logout();
    return response.status(201).json({ message: "Logged out successfully" });
  }

  public async updateUser({ params, request, response }: HttpContextContract) {
    const payload = await request.validate({
      schema: schema.create({
        name: schema.string({}, [rules.minLength(2)]),
      }),
      reporter: validator.reporters.vanilla,
    });
    try {
      const userData = await User.findBy("id", params.id);
      if (userData) {
        userData.name = payload.name;
        await userData.save();
        return response.status(200).send(userData);
      } else {
        return response.status(404).json({ message: "No such user found." });
      }
    } catch (error) {
      console.log("error: ", error);
      return response.status(400).json({ message: "Please enter valid name" });
    }
  }

  public async deleteUser({ params, response }: HttpContextContract) {
    const user = await User.findBy("id", params.id);
    if (!user) {
      return response.status(404).json({ message: "No such user found." });
    } else {
      try {
        await user.delete();
        return response.status(200).json({ message: "User has been deleted." });
      } catch (error) {
        return response
          .status(400)
          .json({ message: "network error occurred." });
      }
    }
  }
}
