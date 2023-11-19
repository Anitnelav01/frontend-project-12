lint:
	npx eslint frontend/src/

install:
	npm ci

start-frontend:
	npm start --prefix frontend

start-backend:
	npx start-server -a 0.0.0.0 -p 5002

start-build:
	npm run build --prefix frontend

start:
	make start-frontend & make start-backend
