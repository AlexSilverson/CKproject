package entity

import (
	"fmt"

	"gorm.io/gorm"
)

type UserDto struct {
	Login    string `json:"login" validate:"required,email"`
	Password string `json:"password" validate:"required" `
}

func (u UserDto) MapNewUserDtoToUser() User {
	var ans User
	ans.Model = gorm.Model{}
	ans.Email = u.Login

	ans.Password = u.Password
	fmt.Println(ans)
	return ans
}
