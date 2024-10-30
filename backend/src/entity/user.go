package entity

import "gorm.io/gorm"

type User struct {
	gorm.Model `gorm:"primary_key;autoIncrement:true"`
	Id         uint
	Email      string
	Password   string
}
