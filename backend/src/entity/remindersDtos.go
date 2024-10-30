package entity

import (
	"time"

	"gorm.io/gorm"
)

type ReminderDto struct {
	Id     uint   `json:"id" validate:"required"`
	Msg    string `json:"msg" validate:"required"`
	Before []uint `json:"before" validate:"required"`
	When   string `json:"when" validate:"required"`
}

func (u ReminderDto) MapToRemiders(id uint, user User) (Remind, []Befores) {

	Befores := make([]Befores, len(u.Before))
	layout := "2006-01-02"
	Time, er := time.Parse(layout, u.When)
	if er != nil {
		panic(er)
	}
	ans := Remind{}
	ans.Model = gorm.Model{}
	ans.User = user
	ans.UserId = id
	ans.Msg = u.Msg
	ans.Date = Time

	for i, v := range u.Before {
		Befores[i].Model = gorm.Model{}
		Befores[i].Time = v

	}
	return ans, Befores
}
