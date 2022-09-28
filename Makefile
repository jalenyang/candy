build-candy-app:
	cd candy-app && npm run build
build-candy-host:
	cd candy-host && npm run build
build-candy-service:
	cd candy-service && npm run build
build-all: build-candy-app build-candy-host build-candy-service

start-candy-app:
	cd candy-app && npm run start-dev
start-candy-host:
	cd candy-host && npm start-dev
start-candy-service:
	cd candy-service && npm start-dev
start-all-dev: start-candy-app start-candy-host start-candy-service
