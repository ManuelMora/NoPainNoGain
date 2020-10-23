# API usuarios para el gimnacio No Pain No Gain

## Base de datos:
- Ciudad:  
codigo  
nombre  
- Sede  
codigo  
codigo_ciudad  
nombre  
direccion  
- Nivel  
codigo  
nombre  
- Usuario:  
dni  
nombre  
apellido  
pass  
sede  
ciudad  
nivel  

## URI:

- Usuario:  
GET /usuario/login/ // Requiere Basic Auth  
GET /usuarios/sede/{codigo_sede}  
POST /usuario/registro  
  
- Ciudad:  
POST /ciudad/  
  
- Sede:  
POST /sede/  

## Crear Imagenes Docker
Comando para crear la imagen que contendra la API, se ejecuta en la raiz del proyecto:  
docker build -t manuel/nopainnogain:latest .  
  
Comando para crear la imagen que contendra la base de datos de la api, se ejecuta en la carpeta database:
cd ./database/  
docker build -t manuel/nopainnogaindb .  

## Desplegar contenedores

Se crea una red a la que se conectaran los contenedores para poder comunicarse:  
docker network create my-net  

Comando para iniciar el contenedor de la base de datos:  
docker run -d -p 3306:3306 --network my-net --name=nopainnogaindb -e MYSQL_ROOT_PASSWORD=123456 manuel/nopainnogaindb
  
Comando para iniciar el contenedor de la API:  
docker run -p 3000:3000 --network my-net --name=nopainnogain manuel/nopainnogain
  
NOTA: Es necesario verificar que la base de datos esta lista para recibir conexiones, de lo contrario el contenedor de
la API fallara al iniciar.  
