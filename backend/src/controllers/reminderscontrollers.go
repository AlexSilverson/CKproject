package controllers

import (
	"fmt"

	"github.com/AlexSilverson/CKproject/src/entity"
	"github.com/AlexSilverson/CKproject/src/services"
	"github.com/AlexSilverson/CKproject/src/utility"
	"github.com/gofiber/fiber/v2"
)

// AddReminders Adding Reminders
//
//	@Summary		AddReminders
//	@Description	AddReminders
//	@Tags			Reminders
//	@Accept			json
//	@Produce		json
//	@Param			token			header		string	true	"jwt token"
//	@Param			request			body		entity.ReminderDto	true	"Request of Creating User Object"
//	@Failure		400				{string}	9string
//	@Failure		404				{string}	string
//	@Success		200				{string}	string
//	@Router			/aunt/addremind [post]
func AddReminds(app *fiber.App, rs services.RemindersService, us services.UserService) fiber.Router {
	return app.Post("/aunt/addremind", func(c *fiber.Ctx) error {
		var ReminderDto entity.ReminderDto
		fmt.Println("here in addreminds")
		err := c.BodyParser(&ReminderDto)

		if err != nil {
			return c.Status(fiber.StatusBadRequest).JSON("User format is not valid")
		}
		fmt.Println(ReminderDto)
		Claims, err := utility.ParseToken(c.Get("token"))
		fmt.Println("id в клеймах", Claims.ID)
		if err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(err.Error())
		}
		user, err := us.GetUserById(Claims.ID)
		if err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(err.Error())
		}
		Remind, Befores := ReminderDto.MapToRemiders(Claims.ID, *user)
		fmt.Println(Remind)
		for _, u := range Befores {
			fmt.Println(u)
		}
		err = rs.AddReminders(Remind, Befores)
		if err == nil {
			return c.Status(fiber.StatusOK).JSON("added")
		} else {
			return c.Status(fiber.StatusBadRequest).JSON(err)
		}
	})
}

// GetAllUsersReminds Getting Reminds by token
//
//	@Summary		Getting Reminds by token
//	@Tags			Reminders
//	@Accept			json
//	@Produce		json
//	@Param			token				header		string	true	"jwt token"
//	@Failure		400				{string}	string
//	@Failure		404				{string}	string
//	@Success		200				{string}	string
//	@Router			/aunt/user [get]
func GetAllUsersReminds(app *fiber.App, rs services.RemindersService) fiber.Router {
	return app.Get("/aunt/user", func(c *fiber.Ctx) error {
		Claims, err := utility.ParseToken(c.Get("token"))
		fmt.Println("id в клеймах", Claims.ID)
		if err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(err.Error())
		}
		remindsDto, err := rs.GetAllUsersReminders(Claims.ID)
		if err == nil {
			return c.Status(fiber.StatusOK).JSON(remindsDto)
		} else {
			return c.Status(fiber.StatusBadRequest).JSON(err)
		}
	})
}

// Deleting remind using token
//
//	@Tags			Reminders
//	@Accept			json
//	@Produce		json
//	@Param			token				header		string	true	"jwt token"
//	@Failure		400				{string}	string
//	@Failure		404				{string}	string
//	@Success		200				{string}	string
//	@Router			/aunt/user [delete]
func DeleteRemind(app *fiber.App, rs services.RemindersService) fiber.Router {
	return app.Delete("/aunt/user", func(c *fiber.Ctx) error {
		Claims, err := utility.ParseToken(c.Get("token"))
		fmt.Println("id в клеймах", Claims.ID)
		if err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(err.Error())
		}
		err = rs.DeleteRemind(Claims.ID)
		if err == nil {
			return c.Status(fiber.StatusOK).JSON("deleted")
		} else {
			return c.Status(fiber.StatusBadRequest).JSON(err)
		}
	})
}

// UpdateReminders Uppdaating Reminders
//
//	@Tags			Reminders
//	@Accept			json
//	@Produce		json
//	@Param			token			header		string	true	"jwt token"
//	@Param			request			body		entity.ReminderDto	true	"Request of Creating User Object"
//	@Failure		400				{string}	9string
//	@Failure		404				{string}	string
//	@Success		200				{string}	string
//	@Router			/aunt/addremind [put]
func UpdateReminds(app *fiber.App, rs services.RemindersService, us services.UserService) fiber.Router {
	return app.Put("/aunt/addremind", func(c *fiber.Ctx) error {
		var ReminderDto entity.ReminderDto
		fmt.Println("here in addreminds")
		err := c.BodyParser(&ReminderDto)

		if err != nil {
			return c.Status(fiber.StatusBadRequest).JSON("User format is not valid")
		}
		fmt.Println(ReminderDto)
		Claims, err := utility.ParseToken(c.Get("token"))
		fmt.Println("id в клеймах", Claims.ID)
		if err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(err.Error())
		}
		user, err := us.GetUserById(Claims.ID)
		if err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(err.Error())
		}
		Remind, Befores := ReminderDto.MapToRemiders(Claims.ID, *user)
		fmt.Println(Remind)
		for _, u := range Befores {
			fmt.Println(u)
		}
		Remind.Id = ReminderDto.Id
		err = rs.UpdateRemind(Remind, Befores)
		if err == nil {
			return c.Status(fiber.StatusOK).JSON("updated")
		} else {
			return c.Status(fiber.StatusBadRequest).JSON(err)
		}
	})
}
