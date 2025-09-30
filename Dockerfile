FROM node:18-alpine AS build

WORKDIR /app
COPY package.json ./
COPY package-lock.json* ./

RUN npm install
COPY ..

RUN npm run build

#Run stage
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

RUN chmod 644 /etc/nginx/conf.d/default.conf

EXPORT 80
CMD ['nginx', '-g', 'daemon off;']