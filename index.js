const server = require('./src/server');
const usuario = require('./src/usuario');
const ciudad = require('./src/ciudad');
const sede = require('./src/sede');

server.agregarRecursoGet('/usuario/login', (req, res) => usuario.login(req, res));

server.agregarRecursoPost('/ciudad/', (req, res) => ciudad.crearCiudad(req, res));
server.agregarRecursoPost('/sede/', (req, res) => sede.crearSede(req, res));
server.agregarRecursoPost('/usuario/', (req, res) => usuario.crearUsuario(req, res));

server.conectar();