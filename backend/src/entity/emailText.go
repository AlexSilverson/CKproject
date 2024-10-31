package entity

import "time"

type EmailText struct {
	to     string
	When   time.Time
	Before uint
}
