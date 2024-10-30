package entity

import (
	"time"

	"gorm.io/gorm"
)

type Remind struct {
	gorm.Model
	Id     uint `gorm:"primary_key;autoIncrement:true" `
	UserId uint
	User   User `gorm:"foreignKey:UserId"`
	Before uint
	Msg    string
	Date   time.Time
}
type Befores struct {
	gorm.Model
	Id       uint `gorm:"primary_key;autoIncrement:true" `
	Time     uint
	RemindId uint
	Remind   Remind `gorm:"foreignKey:RemindId"`
}

func (u Remind) MapToRemiderDto(befores []Befores) (ans ReminderDto) {
	ans.Id = u.Id
	ans.Msg = u.Msg
	layout := "2006-01-02"
	ans.When = u.Date.Format(layout)
	bf := make([]uint, len(befores))
	for i, v := range befores {
		bf[i] = v.Time
	}
	ans.Before = bf
	return
}
