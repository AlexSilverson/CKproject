package middleware

import (
	"fmt"

	"github.com/AlexSilverson/CKproject/src/utility"
	"github.com/gofiber/fiber/v2"
)

// @title			2lab API
// @version		1.0
// @description	This is a sample swagger for second RCSP lab
// @termsOfService	http://swagger.io/terms/
func Auntification(c *fiber.Ctx) error {

	token := c.Get("token")
	fmt.Println("here", token)
	_, er := utility.ParseToken(token)
	if er != nil {
		return c.Status(fiber.StatusNotFound).JSON("invalid token")

	}
	fmt.Println("auntpass")
	return c.Next()
}
