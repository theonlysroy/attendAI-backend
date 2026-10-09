BINARY := attendai
BUILD_DIR := bin
ENTRY_FILE := ./cmd/api/

.PHONY: run build clean fmt vet test

build:
	go build -o $(BUILD_DIR)/$(BINARY) $(ENTRY_FILE)

run:
	@go run $(ENTRY_FILE)/main.go

clean:
	rm -rf $(BUILD_DIR)

fmt:
	go fmt ./...

vet:
	go vet ./...

test:
	go test ./... -v
