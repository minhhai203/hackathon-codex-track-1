.PHONY: run web web-build web-lint test lint format check clean

run:
	uvicorn src.backend.main:app --reload --host 0.0.0.0 --port 8000

web:
	cd src/frontend && npm run dev

web-build:
	cd src/frontend && npm run build

web-lint:
	cd src/frontend && npm run lint

test:
	pytest tests/ -v

lint:
	ruff check src/ tests/

format:
	ruff format src/ tests/

check: lint test

clean:
	find . -type d -name __pycache__ -exec rm -rf {} +
	find . -type d -name .pytest_cache -exec rm -rf {} +
	find . -type d -name .ruff_cache -exec rm -rf {} +
