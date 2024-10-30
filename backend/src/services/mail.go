package services

import "net/smtp"

type mailService struct {
	From     string
	Password string
	Host     string
	Port     string
}

type MailService interface {
	SendMail(to []string, subject string, body string) error
}

func (m mailService) SendMail(to []string, subject string, body string) error {
	address := m.Host + ":" + m.Port
	message := []byte(subject + body)
	auth := smtp.PlainAuth("", m.From, m.Password, m.Host)
	err := smtp.SendMail(address, auth, m.From, to, message)
	return err
}

func NewMailSevice(From string, Password string, Host string, Port string) MailService {
	return &mailService{
		From:     From,
		Password: Password,
		Host:     Host,
		Port:     Port,
	}
}
