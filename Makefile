CONFIG_PATH := $(shell echo "${HOME}")/.config/@mjohnsey/video-rippers
CONFIG_FILE := $(CONFIG_PATH)/config.toml
EXMAPLE_CONFIG_FILE := $(shell pwd)/config.toml.example

.PHONY: copy-config-toml
copy-config-toml:
	@mkdir -p $(CONFIG_PATH)
	@cp $(EXMAPLE_CONFIG_FILE) $(CONFIG_PATH)/config.toml