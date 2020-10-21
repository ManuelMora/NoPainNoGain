const mysql = require('mysql');
const conn = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'123456',
    database: 'no_pain_no_gain'
});

conn.connect(err => {
    if(err) throw err;
    console.log('Connected!');
});

class DataBase{
    constructor(conn) {
        this.conn = conn;
    }

    getUsuario(alias, pass) {
        const selectUsuario = `SELECT * FROM usuario AS us 
            WHERE us.alias = ${conn.escape(alias)} 
            AND us.pass = AES_ENCRYPT(${conn.escape(pass)},${conn.escape(alias)});`;

        return new Promise((resuelve, rechazo) => {
            this.conn.query(selectUsuario, (error, resultado) => {
                if(error) 
                    rechazo(error);
    
                resuelve(resultado);
            });
        });
    }

    crearSesion(usuario) {
        const insertSesion = `INSERT INTO token (dni_usuario, token) 
            VALUES (${conn.escape(usuario.dni)}, SHA2(NOW(), 256));`;
        return new Promise((resuelve, rechazo) => {
            this.conn.query(insertSesion, (error, resultado) => {
                if (error)
                    rechazo(error);
                
                this.getSesion(usuario)
                    .then(token => resuelve(token))
                    .catch(error => rechazo(error));
            });
        });
    }

    getSesion(usuario) {
        const selectSesion = `SELECT * FROM token 
        WHERE dni_usuario = ${conn.escape(usuario.dni)} AND NOW() < DATE_ADD(fecha,INTERVAL 120 MINUTE)
        ORDER BY fecha LIMIT 1;`;

        return new Promise((resuelve, rechazo) => {
            this.conn.query(selectSesion, (error, resultado) =>  {
                if(error)
                    rechazo(error);
                
                if(resultado.length == 1)
                    resuelve(resultado);
                else
                    rechazo({'message':'No se encontraron sesiones activas'});
            });
        });
    }
}

module.exports = new DataBase(conn);
