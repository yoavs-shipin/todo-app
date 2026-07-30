.PHONY: review-ready-local help test

help:
	@grep -E '^[a-zA-Z_-]+:.*?## ' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  %-22s %s\n", $$1, $$2}'

test: ## Run backend unit tests
	cd backend && npm test

review-ready-local: ## Install deps, build, and verify app is review-ready locally
	@echo "▶ review-ready-local (todo-app)"
	npm run install:all
	npm run build
	npm test
	@echo "✔ review-ready-local: todo-app built and tests green"
