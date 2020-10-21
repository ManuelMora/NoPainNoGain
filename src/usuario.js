const database = require('./modelo/database');
const { parseAliasPass } = require('./util');

class Usuario {
    constructor(database) {
        this.database = database;
    }

    login(req, res) {
        const credencialesBase64 = req.header('Authorization');
        if(credencialesBase64 == undefined) {
            res.status(401).json({'error':'No estan definidas las credenciales del usuario'});
        }

        const {alias, pass} = parseAliasPass(credencialesBase64);

        this.database.getUsuario(alias, pass)
            .then(resultado => {
                if(resultado.length == 1) 
                    this.database.crearSesion(resultado[0])
                    .then(token => {
                        res.status(200).json({'token':token});
                    })
                    .catch(error => {
                        res.status(500).json({'error': error.message});
                    });
                else
                    res.status(401).json({'error':'Nombre de usuario o contraseña incorrectos'});
            })
            .catch(error => {
                res.status(500).json({'error': error.message});
            });
        
    }

    crearUsuario(req, res) {
        this.database.crearUsuario(req.body)
            .then(resultado => {
                this.database.getUsuario(req.body.alias, req.body.pass)
                .then(resultado => {
                    res.status(200).json(resultado[0]);
                })
                .catch(error => {
                    res.status(500).json({'error': error.message});
                });
            })
            .catch(error => res.status(500).json({"error": error.message}));
    }

    getUsuariosSede(req, res) {
        this.database.getUsuarioToken(req.header('token'))
            .then(resultado => {
                if(resultado.length == 1 && resultado[0].nombre_nivel == 'administrador')
                    this.database.getUsuariosSede(req.params.codigo_sede)
                        .then(resultado => res.status(200).json(resultado))
                        .catch(error => res.status(500).json({"error": error.message}));
                else
                    res.status(401).json({'error':'El usuario no tiene los permisos necesarios para realizar la accion'});
            })
            .catch(error => res.status(500).json({"error": error.message}));
    }
}

module.exports = new Usuario(database);
