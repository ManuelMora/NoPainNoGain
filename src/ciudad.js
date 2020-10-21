const database = require('./modelo/database');
const usuario = require('./usuario');

class Ciudad {
    constructor(database) {
        this.database = database;
    }

    crearCiudad(req, res) {
        this.database.getUsuarioToken(req.header('token'))
            .then(resultado => {
                if(resultado.length == 1 && resultado[0].nombre_nivel == 'administrador')
                    this.database.crearCiudad(req.body)
                        .then(resultado => {
                            res.status(200).json({'codigo':resultado.insertId, 'nombre':req.body.nombre});
                        })
                        .catch(error => res.status(500).json({'error':error.message}));
                else
                    res.status(401).json({'error':'El usuario no tiene los permisos necesarios para realizar la accion'});
            })
            .catch(error => res.status(500).json({'error': error.message}));
    }
}

module.exports = new Ciudad(database);