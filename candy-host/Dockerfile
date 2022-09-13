# build service
FROM node:alpine as builder
ARG registry
ARG http_proxy
ARG https_proxy
ENV http_proxy=${http_proxy}
ENV https_proxy=${https_proxy}
WORKDIR /app
RUN npm set proxy=${http_proxy}
RUN npm config list
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

# start in development mode
FROM builder as development-build
ENV NODE_ENV development
EXPOSE 3000
ENTRYPOINT [ "npm", "run", "start-dev" ]

# start in production mode
FROM node:alpine
WORKDIR /app
COPY --from=builder /app/dist/* ./
EXPOSE 3000
ENTRYPOINT ["node", "/app/bundle.js"]
