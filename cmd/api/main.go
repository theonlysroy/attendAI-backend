package main

import (
	"errors"
	"fmt"
	"log/slog"
	"os"
	"runtime/debug"

	"github.com/theonlysroy/attendAI-backend/internal/config"
)

func main() {
	fmt.Println("Attendai - backend")

	// any uncaught panic in THIS goroutine gets logged properly.
	// then exit 1
	defer func() {
		if r := recover(); r != nil {
			slog.Error("panic", "value", r, "stack", string(debug.Stack()))
			os.Exit(1)
		}
	}()

	if err := run(); err != nil {
		slog.Error("fatal", "err", err)
		os.Exit(1)
	}
}

func run() error {
	cfg, err := config.LoadConfig()
	if err != nil {
		var cfgErr *config.ConfigError
		if errors.As(err, &cfgErr) {
			slog.Error("config invalid", "problems", cfgErr.Problems)
		}
		return fmt.Errorf("load config: %w", err)
	}
	slog.Info("starting server", "port", cfg.Port, "env", cfg.Env)
	return nil
}
