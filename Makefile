install:
	npm ci

start-frontend:
	npm start --prefix frontend

start-backend:
	npx start-server

start:
	make start-backend & make start-frontend