# Dockerfile
FROM node:20 as builder

WORKDIR /app

# Copie des fichiers de dépendances
COPY package*.json ./
RUN npm install

# Copie du reste des fichiers
COPY . .

# Build de l'application
RUN npm run build

# Étape Nginx
FROM nginx:stable-alpine

# Copie de la configuration Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copie des fichiers de build depuis l'étape précédente
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 8088

CMD ["nginx", "-g", "daemon off;"]