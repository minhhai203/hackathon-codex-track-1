.PHONY: run web web-build web-lint test lint format check check-web clean

run:
	uvicorn src.backend.main:app --reload --host 0.0.0.0 --port 8000

web:
	npm run dev --prefix src/frontend

web-build:
	npm run build --prefix src/frontend

web-lint:
	npm run lint --prefix src/frontend

check-web: web-lint

test:
	pytest tests/ -v

lint:
	ruff check src/ tests/

format:
	ruff format src/ tests/

check: lint test web-lint

clean:
	find . -type d -name __pycache__ -exec rm -rf {} +
	find . -type d -name .pytest_cache -exec rm -rf {} +
	find . -type d -name .ruff_cache -exec rm -rf {} +
	find . -type d -name .next -exec rm -rf {} +
