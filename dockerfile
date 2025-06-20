# Étape 1 : Build Angular
FROM node:20 AS builder
WORKDIR /app
COPY . .
RUN npm ci && npm run build -- --base-href=/pokedex/

# Étape 2 : Serve avec NGINX
FROM nginx:alpine
COPY --from=builder /app/dist/angular-pokedex/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
