const server = require('./src/server');
const usuario = require('./src/usuario');
const ciudad = require('./src/ciudad');

server.agregarRecursoGet('/usuario/login', (req, res) => usuario.login(req, res));

server.agregarRecursoPost('/ciudad/', (req, res) => ciudad.crearCiudad(req, res));

server.conectar();