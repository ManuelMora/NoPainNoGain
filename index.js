const server = require('./src/server');
const usuario = require('./src/usuario');

server.agregarRecursoGet('/usuario/login', (req, res) => {
    usuario.login(req, res);
});

server.conectar();