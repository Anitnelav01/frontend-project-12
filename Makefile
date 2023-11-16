lint:
	npx eslint frontend/src/

install:
	npm ci

start-frontend:
	npm start --prefix frontend

start-backend:
	npx start-server

start-build:
	npm run build --prefix frontend

start:
	make start-frontend & make start-backend

build:
	make start-backend & make start-build
