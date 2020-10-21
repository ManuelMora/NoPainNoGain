const express = require('express');
const bodyParser = require('body-parser');

const HOST = '0.0.0.0';
const PORT = 3000;

class Server {
    constructor() {
        this.app = null;
        this.recursosGet = new Map();
        this.recursosPost = new Map();
    }

    agregarRecursoGet(ruta, funcion) {
        this.recursosGet.set(ruta, funcion);
    }

    agregarRecursoPost(ruta, funcion) {
        this.recursosPost.set(ruta, funcion);
    }

    conectar() {
        this.app = express();
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json());

        for (const recursoGet of this.recursosGet) {
            this.app.get(recursoGet[0], recursoGet[1]);
        }

        for (const recursoPost of this.recursosPost) {
            this.app.post(recursoPost[0], recursoPost[1]);
        }

        this.app.listen(PORT, HOST);
    }
}

module.exports = new Server();
