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
	GetAllUsersReminders(id uint) ([]entity.ReminderDto, error)
	DeleteBefores(id uint) error
	DeleteRemind(id uint) error
	UpdateRemind(entity.Remind, []entity.Befores) error
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

func (r remindersService) GetAllUsersReminders(id uint) ([]entity.ReminderDto, error) {
	var Reminds []entity.Remind
	erdb := r.db.Where("user_id = ?", id).Find(&Reminds)
	if erdb.Error != nil {
		return nil, erdb.Error
	}
	RemindsDto := make([]entity.ReminderDto, len(Reminds))
	for i, v := range Reminds {
		fmt.Println(v.Id, v.UserId, v.Msg)
		var Befores []entity.Befores
		erdb := r.db.Where("remind_id = ?", v.Id).Find(&Befores)
		if erdb.Error != nil {
			return nil, erdb.Error
		}
		for _, u := range Befores {
			fmt.Println("	", u.Time)
		}
		fmt.Println(v.MapToRemiderDto(Befores))
		RemindsDto[i] = v.MapToRemiderDto(Befores)
	}
	return RemindsDto, nil
}

func (r remindersService) DeleteBefores(id uint) error {
	erdb := r.db.Where("remind_id = ?", id).Delete(&entity.Befores{})
	return erdb.Error
}

func (r remindersService) DeleteRemind(id uint) error {
	erdb := r.db.Where("remind_id = ?", id).Delete(&entity.Befores{})
	fmt.Println("here")
	if erdb.Error != nil {
		return erdb.Error
	}
	fmt.Println("here in delete rem")
	erdb = r.db.Delete(&entity.Remind{}, id)
	return erdb.Error
}
func (r remindersService) UpdateRemind(Reminder entity.Remind, Befores []entity.Befores) error {
	erdb := r.db.Save(&Reminder)
	if erdb.Error != nil {
		return erdb.Error
	}
	erdb = r.db.Where("remind_id = ?", Reminder.Id).Delete(&entity.Befores{})
	if erdb.Error != nil {
		return erdb.Error
	}
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
