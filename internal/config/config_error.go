package config

import (
	"strings"
)

type ConfigError struct {
	Problems []string
}

func (e *ConfigError) Error() string {
	return "invalid config: " + strings.Join(e.Problems, "; ")
}
