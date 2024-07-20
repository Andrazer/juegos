# Usa la imagen oficial de Nginx como base
FROM nginx:alpine

# Copia los archivos de tu proyecto al contenedor
COPY . /usr/share/nginx/html

# Expone el puerto en el que el servidor web escuchará
EXPOSE 80
