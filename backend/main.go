package main

import (
	postgres "github.com/AlexSilverson/CKproject/Storages/Postgres"
	_ "github.com/AlexSilverson/CKproject/docs"
	"github.com/AlexSilverson/CKproject/src/controllers"
	"github.com/AlexSilverson/CKproject/src/middleware"
	"github.com/AlexSilverson/CKproject/src/services"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/swagger"
)

// @title			2lab API
// @version		1.0
// @description	This is a sample swagger for second RCSP lab
// @termsOfService	http://swagger.io/terms/
func main() {
	app := fiber.New()
	db := postgres.Init()
	app.Get("/swagger/*", swagger.HandlerDefault)
	auntGroup := app.Group("/aunt")
	auntGroup.Use(middleware.Auntification)
	userService := services.NewUserSevice(db)
	remindersSrvice := services.NewRemindersSevice(db)
	controllers.AddUser(app, userService)
	controllers.LoginUser(app, userService)
	controllers.AddReminds(app, remindersSrvice, userService)
	app.Listen(":8081")
}
