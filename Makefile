lint-frontend:
	npx eslint frontend/src/

install:
	cd frontend && npm ci

start-frontend:
	npm start --prefix frontend

start-backend:
	npx start-server

start:
	make start-backend & make start-frontend