lint-frontend:
	npx eslint frontend/src/

install:
	npm ci

start-frontend:
	npm run build --prefix frontend

start-backend:
	npx start-server -s ./frontend

start:
	make start-backend & make start-frontend