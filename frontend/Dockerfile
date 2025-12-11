FROM node:20-alpine AS build
WORKDIR /app

ARG VITE_BASE_URL
ARG VITE_GA_TOKEN

COPY package*.json ./
RUN npm ci
COPY . .

RUN printf "VITE_BASE_URL=%s\nVITE_GA_TOKEN=%s\n" \
    "$VITE_BASE_URL" "$VITE_GA_TOKEN" > .env

RUN npm run build


FROM nginx:stable-alpine

COPY nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"]
