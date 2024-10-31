package services

import (
	"context"
	"fmt"
	"os"
	"time"

	"github.com/AlexSilverson/CKproject/src/entity"
	"github.com/stephenafamo/kronika"
	"gorm.io/gorm"
)

type planerService struct {
	db *gorm.DB
}

type PlanerService interface {
	DailyService(mailService MailService) error
}

func (p planerService) DailyService(mailService MailService) error {
	fmt.Println("here")
	ctx := context.Background()
	start := time.Now()
	interval := time.Second * 10
	Query, er := os.ReadFile("Storages/Postgres/GetDailyRecipient.txt")
	if er != nil {
		return er
	}
	var emailTexst []entity.EmailText
	for t := range kronika.Every(ctx, start, interval) {

		erdb := p.db.Raw(string(Query)).Scan(&emailTexst)
		if erdb.Error != nil {
			panic(erdb.Error)
		}
		fmt.Println("result sql: ", emailTexst, t)
	}
	return nil
}
func NewPlanerSevice(db *gorm.DB) PlanerService {
	return &planerService{db: db}
}
