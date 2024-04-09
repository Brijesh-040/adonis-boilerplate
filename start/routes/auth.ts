import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.post("auth/login", "AuthController.login");
    Route.post("auth/register", "AuthController.register");
}).prefix('/v1/api')