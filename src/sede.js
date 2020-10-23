class Sede {
    constructor(database) {
        this.database = database;
    }

    crearSede(req, res) {
        this.database.getUsuarioToken(req.header('token'))
            .then(resultado => {
                if(resultado.length == 1 && resultado[0].nombre_nivel == 'administrador')
                    this.database.crearSede(req.body)
                        .then(resultado => {
                            res.status(200).json({
                                'codigo':resultado.insertId, 
                                'codigo_ciudad':req.body.codigo_ciudad,
                                'nombre':req.body.nombre,
                                'direccion':req.body.direccion
                            });
                        })
                        .catch(error => res.status(500).json({'error':error.message}));
                else
                    res.status(401).json({'error':'El usuario no tiene los permisos necesarios para realizar la accion'});
            })
            .catch(error => res.status(500).json({'error': error.message}));
    }
}

module.exports = Sede;
