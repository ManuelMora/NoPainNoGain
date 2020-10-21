const express = require('express');

const HOST = '0.0.0.0';
const PORT = 3000;

class Server {
    constructor() {
        this.app = null;
        this.recursosGet = new Map();
    }

    agregarRecursoGet(ruta, funcion) {
        this.recursosGet.set(ruta, funcion);
    }

    conectar() {
        this.app = express();
        for (const recursoGet of this.recursosGet) {
            this.app.get(recursoGet[0], recursoGet[1]);
        }
        this.app.listen(PORT, HOST);
    }
}

module.exports = new Server();
