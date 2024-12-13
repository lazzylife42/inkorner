# Dockerfile
FROM node:20

WORKDIR /app

# Copie des fichiers de dépendances
COPY package*.json ./

# Installation des dépendances
RUN npm install

# Copie du reste des fichiers
COPY . .

# Build de l'application
RUN npm run build

# Installation d'un serveur léger
RUN npm install -g serve

EXPOSE 8088

# Démarrage du serveur
CMD ["serve", "-s", "dist", "-l", "8088"]