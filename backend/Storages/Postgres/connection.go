package postgres

import (
	"fmt"

	"github.com/AlexSilverson/CKproject/src/entity"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func Init() *gorm.DB {
	dsn := "host=localhost user=postgres password=Alex0910? dbname=CKproject port=5432 sslmode=disable"
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		panic(err)
	}
	fmt.Println("ok")
	err = db.AutoMigrate(&entity.User{}, &entity.Remind{}, &entity.Befores{})
	if err != nil {
		panic(err)
	}
	fmt.Println("ok")
	return db
}
