FROM node:alpine as builder

WORKDIR /app
COPY . .

RUN npm install
RUN npm run build

FROM nginx:alpine as prod
WORKDIR /app

COPY --from=builder /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf


EXPOSE 7101

CMD ["nginx", "-g", "daemon off;"]


