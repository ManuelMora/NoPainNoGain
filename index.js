const server = require('./src/server');
const database = require('./src/modelo/database');
const Usuario = require('./src/usuario');
const Ciudad = require('./src/ciudad');
const Sede = require('./src/sede');

const usuario = new Usuario(database);
const ciudad = new Ciudad(database);
const sede = new Sede(database);

server.agregarRecursoGet('/usuario/login', (req, res) => usuario.login(req, res));
server.agregarRecursoGet('/usuario/sede/:codigo_sede', (req, res) => usuario.getUsuariosSede(req,res));

server.agregarRecursoPost('/ciudad/', (req, res) => ciudad.crearCiudad(req, res));
server.agregarRecursoPost('/sede/', (req, res) => sede.crearSede(req, res));
server.agregarRecursoPost('/usuario/', (req, res) => usuario.crearUsuario(req, res));

server.conectar();