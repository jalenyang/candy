FROM node:alpine as builder
ARG registry
WORKDIR /builder
RUN npm set registry=${registry}
RUN npm config list
COPY . .
RUN npm install
RUN npm run build

FROM node:alpine
WORKDIR /app
COPY --from=builder /builder/dist/* ./
EXPOSE 3000
ENTRYPOINT ["node", "/app/bundle.js"]
