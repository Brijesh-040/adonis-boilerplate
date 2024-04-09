import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.post("/auth/login", "AuthController.login");
    Route.post("/auth/register", "AuthController.register");

    Route.group(() => {
        Route.get("/user", "UserController.getUser");
        Route.post("/user/logout", "UserController.logout");
        Route.put("/user/:id", "UserController.updateUser");
        Route.delete("/user/:id", "UserController.deleteUser");
    }).middleware("auth:api")
}).prefix('/v1/api')