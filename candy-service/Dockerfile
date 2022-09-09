FROM node:alpine as builder
ARG registry
WORKDIR /builder
COPY package.json .
RUN npm set registry=${registry}
RUN npm config list
RUN npm install
COPY . .
RUN npm bulild
EXPOSE 3000
CMD [ "node", "dist/src/index.js" ]


#FROM node:alpine
#WORKDIR /app
#COPY --from=builder /builder/dist/* ./
#EXPOSE 3000
#ENTRYPOINT ["node", "/app/index.js"]
