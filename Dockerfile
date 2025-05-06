# Etapa 1: Construcción de la aplicación Angular
FROM --platform=linux/arm64 node:18 AS build

WORKDIR /app

# Copiar package.json y package-lock.json
COPY package.json package-lock.json ./
RUN npm install --force

# Copiar el resto del código y compilar la aplicación
COPY . .
RUN npm run build

# Etapa 2: Servir la aplicación con Nginx
FROM nginx:1.23 AS server

# Copiar la aplicación compilada al servidor Nginx
COPY --from=build /app/dist/  /usr/share/nginx/html

# Copiar configuración personalizada de Nginx (opcional)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer el puerto 80 para acceder a la aplicación
EXPOSE 80

# Iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
