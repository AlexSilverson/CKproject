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

// @title			CK project API
// @version		1.0
// @description	This is a sample swagger for CK project API
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
	controllers.GetAllUsersReminds(app, remindersSrvice)
	controllers.UpdateReminds(app, remindersSrvice, userService)
	controllers.DeleteRemind(app, remindersSrvice)
	app.Listen(":8081")
}

/*
{
  "before": [
    1, 3, 5, 7, 30
  ],
  "msg": "second testing message",
  "when": "2024-11-29"
}

alexsilverson@yandex.ru
20012001
*/
