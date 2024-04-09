import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
  Route.group(() => {
    Route.get("", "ProductsController.allProducts");
    Route.post("/add", "ProductsController.addProduct");
    Route.put("/:id", "ProductsController.updateProduct");
    Route.delete("/:id", "ProductsController.deleteProduct");
  }).middleware("auth:api");
}).prefix("/v1/api/products");
