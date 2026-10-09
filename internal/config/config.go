package config

import (
	"errors"
	"fmt"
	"reflect"
	"strings"

	"github.com/caarlos0/env/v11"
	"github.com/go-playground/validator/v10"
	"github.com/joho/godotenv"
)

type Config struct {
	Env       string `env:"APP_ENV" envDefault:"development" validate:"oneof=development staging production"`
	Port      int    `env:"PORT" envDefault:"4040" validate:"min=3000,max=5000"`
	MongoURI  string `env:"MONGO_URI,required" validate:"startswith=mongodb"`
	JWTSecret string `env:"JWT_SECRET,required" validate:"min=12"`
}

// load the env file, parse and validate
// currently loads only the ".env" file, no env driven
func LoadConfig() (*Config, error) {
	if err := godotenv.Load(".env"); err != nil {
		return nil, fmt.Errorf("load .env %w", err)
	}

	var cfg Config
	// parse the env file
	if err := env.Parse(&cfg); err != nil {
		return nil, &ConfigError{Problems: []string{err.Error()}}
	}

	// validate after successful parsing
	if err := newValidator().Struct(&cfg); err != nil {
		var verrs validator.ValidationErrors
		if errors.As(err, &verrs) {
			problems := extractValidationErrors(verrs)
			return nil, &ConfigError{Problems: problems}
		}
	}
	return &cfg, nil
}

func newValidator() *validator.Validate {
	v := validator.New()
	v.RegisterTagNameFunc(func(f reflect.StructField) string {
		name, _, _ := strings.Cut(f.Tag.Get("env"), ",")
		return name
	})
	return v
}

// wrapper func to extract the problems (errors)
// from the validation error
func extractValidationErrors(verrs validator.ValidationErrors) []string {
	problems := make([]string, 0, len(verrs))
	for _, fe := range verrs {
		problems = append(problems, formatFieldError(fe))
	}
	return problems
}

// return the formatted field error from the validator field
func formatFieldError(fe validator.FieldError) string {
	return fmt.Sprintf("%s failed %q rule (param=%q, got=%v)", fe.Field(), fe.Tag(), fe.Param(), redact(fe.Field(), fe.Value()))
}

// dont leak secrets into logs
func redact(field string, v any) any {
	if strings.Contains(field, "SECRET") {
		return "***"
	}
	return v
}
