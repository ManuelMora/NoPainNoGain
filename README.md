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

- Administrador:
POST /admin/login/

- Usuario Normal:
POST /usuario/registro

- Ciudad
POST /ciudad/

- Sede
POST /sede/
GET /sede/usuarios