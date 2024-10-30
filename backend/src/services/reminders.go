package services

import (
	"fmt"

	"github.com/AlexSilverson/CKproject/src/entity"
	"gorm.io/gorm"
)

type remindersService struct {
	db *gorm.DB
}

type RemindersService interface {
	AddReminders(entity.Remind, []entity.Befores) error
}

func (r remindersService) AddReminders(Reminder entity.Remind, Befores []entity.Befores) error {
	erdb := r.db.Create(&Reminder)
	if erdb.Error != nil {
		return erdb.Error
	}
	fmt.Println(Reminder)
	erdb = r.db.Last(&Reminder)
	fmt.Println(Reminder)
	for _, u := range Befores {
		u.RemindId = Reminder.Id
		erdb := r.db.Create(&u)
		if erdb.Error != nil {
			return erdb.Error
		}
	}

	return nil
}
func NewRemindersSevice(db *gorm.DB) RemindersService {
	return &remindersService{db: db}
}
