import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { rules, schema, validator } from "@ioc:Adonis/Core/Validator";
import Product from "App/Models/Product";

export default class ProductsController {
  public async addProduct({ auth, request, response }: HttpContextContract) {
    const user = auth.use("api").user;

    const payload = await request.validate({
      schema: schema.create({
        category: schema.string({}, [rules.minLength(2)]),
        name: schema.string({}, [rules.minLength(2)]),
        price: schema.number([rules.required()]),
        description: schema.string(),
        // image: schema.file(),
      }),
      reporter: validator.reporters.vanilla,
    });
    try {
      payload["created_by"] = user?.id || null;
      const product = await Product.create(payload);
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

  public async allProducts({ response }: HttpContextContract) {
    try {
      const products = await Product.query().select("*");
      return response.status(200).send(products);
    } catch (error) {
      console.log("error: ", error);
      return response.status(500).json({ message: "Internal Server Error" });
    }
  }

  public async updateProduct({
    params,
    request,
    response,
  }: HttpContextContract) {
    const payload = await request.validate({
      schema: schema.create({
        category: schema.string({}, [rules.minLength(2)]),
        name: schema.string({}, [rules.minLength(2)]),
        price: schema.number([rules.required()]),
        description: schema.string(),
      }),
      reporter: validator.reporters.vanilla,
    });
    try {
      const product = await Product.findBy("id", params.id);
      if (product) {
        const updatedProduct = await product
          .merge({
            ...payload,
          })
          .save();

        return response.status(201).send(updatedProduct);
      } else {
        return response.status(400).json({ message: "No such product found." });
      }
    } catch (error) {
      console.log("error: ", error);
      return response
        .status(400)
        .json({ message: "Please enter valid details" });
    }
  }

  public async deleteProduct({ params, response }: HttpContextContract) {
    try {
      const product = await Product.findBy("id", params.id);
      if (product) {
        product.isdeleted = true;
        await product.save();
        return response.status(200).send({ message: "Deleted successfully!" });
      } else {
        return response.status(400).json({ message: "No such product found" });
      }
    } catch (error) {
      console.log("error: ", error);
      return response.status(500).json({ message: "Internal Server Error" });
    }
  }
}
