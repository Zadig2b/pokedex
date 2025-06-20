# Étape de build Angular
FROM node:20 AS builder
WORKDIR /app
COPY . .
RUN npm ci && npm run build -- --base-href=/pokedex/

# Étape NGINX
FROM nginx:alpine
COPY --from=builder /app/dist/* /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
