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
}

module.exports = new Usuario(database);
