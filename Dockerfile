# Etapa 1: Compilación del código React
FROM node:20-alpine AS build
WORKDIR /app

# Copiamos los archivos de dependencias e instalamos
COPY package*.json ./
# CAMBIADO: Usamos npm install en lugar de npm ci
RUN npm install

# Copiamos el resto del código y compilamos
COPY . .
RUN npm run build

# Etapa 2: Servidor web ligero (Nginx) para producción
FROM nginx:1.25-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
