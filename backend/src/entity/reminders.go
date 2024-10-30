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
