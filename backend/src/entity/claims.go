package entity

import (
	"github.com/dgrijalva/jwt-go"
)

var SecretKey = "ItIsMyPassword"

type Claims struct {
	ID uint `json:"id"`
	jwt.StandardClaims
}
