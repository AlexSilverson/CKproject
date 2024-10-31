package services

import (
	"errors"
	"fmt"
	"time"

	"github.com/AlexSilverson/CKproject/src/entity"
	"github.com/AlexSilverson/CKproject/src/utility"
	"github.com/dgrijalva/jwt-go"
	"gorm.io/gorm"
)

var SecretKey = "it_is_my_password"

type userService struct {
	db *gorm.DB
}
type UserService interface {
	AddUser(user entity.User) error
	Login(user entity.User) (string, error)
	GetUserIdByEmail(email string) (uint, error)
	GetUserById(id uint) (*entity.User, error)
}

func (r userService) GetUserIdByEmail(email string) (uint, error) {
	var user entity.User
	erdb := r.db.First(&user, email)
	if erdb.Error != nil {
		return user.ID, erdb.Error
	}
	return user.ID, nil
}

func (r userService) AddUser(user entity.User) error {
	user.Password, _ = utility.GetHesh(user.Password)
	erdb := r.db.Create(&user)
	if erdb.Error != nil {
		return erdb.Error
	}
	return nil
}

func (r userService) Login(user entity.User) (string, error) {
	var dbUser entity.User
	erdb := r.db.Where("email = ?", user.Email).First(&dbUser)
	//fmt.Println(dbUser, user)
	if erdb.Error != nil {
		return "", erdb.Error
	}
	user.ID = dbUser.Id
	fmt.Println(dbUser.Id)
	fmt.Println(user)
	//fmt.Println("here in login before pass")
	if !utility.Compare(user.Password, dbUser.Password) {
		//fmt.Print("here in login bad pass")
		return "", errors.New("invalid password")
	}

	exTime := time.Now().Add(40 * time.Minute)
	//fmt.Println("here in Login token 1")

	claims := &entity.Claims{
		ID: user.ID,
		StandardClaims: jwt.StandardClaims{
			Subject:   dbUser.Email,
			ExpiresAt: exTime.Unix(),
		},
	}
	//fmt.Println("here in Login token 2")
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	//fmt.Println("here in Login token 3")
	tokenString, err := token.SignedString([]byte(SecretKey))
	//fmt.Println("here in Login error", err)
	if err != nil {
		return "", errors.New("token couldnt be generated")
	}
	return tokenString, nil
}
func (r userService) GetUserById(id uint) (*entity.User, error) {
	var user entity.User
	erdb := r.db.First(&user, id)
	if erdb.Error != nil {
		return &user, erdb.Error
	}
	return &user, nil
}

func NewUserSevice(db *gorm.DB) UserService {
	return &userService{db: db}
}
