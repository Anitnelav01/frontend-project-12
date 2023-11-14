install:
	npm ci

start-frontend:
	npm start --prefix frontend

start-backend:
	npx start-server

start-build:
	npm run build --prefix frontend

start:
	make start-backend & make start-build & make start-frontend

build:
	make start-backend & make start-build