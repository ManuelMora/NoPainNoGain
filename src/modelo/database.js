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

const NIVEL_USUARIO_CLIENTE = 2;

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

    crearUsuario(usuario) {
        const insertUsuario = `INSERT INTO usuario (dni, codigo_nivel, codigo_sede, alias, nombre, apellido, pass)
        VALUES (${this.conn.escape(usuario.dni)}, ${NIVEL_USUARIO_CLIENTE}, ${this.conn.escape(usuario.codigo_sede)},
        ${this.conn.escape(usuario.alias)}, ${this.conn.escape(usuario.nombre)}, ${this.conn.escape(usuario.apellido)},
        AES_ENCRYPT(${this.conn.escape(usuario.pass)}, ${this.conn.escape(usuario.alias)}));`;

        return new Promise((resuelve, rechazo) =>  {
            this.conn.query(insertUsuario, (error, resultado) => {
                if(error)
                    rechazo(error);
                
                resuelve(resultado);
            });
        });
    }

    getUsuarioToken(token) {
        const selectUsuario = `SELECT us.*, niv.nombre AS nombre_nivel
        FROM usuario AS us
        INNER JOIN nivel AS niv ON niv.codigo = us.codigo_nivel
        INNER JOIN token AS tok ON tok.dni_usuario = us.dni
        WHERE token = ${conn.escape(token)}
            AND NOW() < DATE_ADD(tok.fecha,INTERVAL 120 MINUTE);`;

        return new Promise((resuelve, rechazo) => {
            this.conn.query(selectUsuario, (error, resultado) => {
                if(error) 
                    rechazo(error);
                
                resuelve(resultado);
            })
        });
    }

    crearSesion(usuario) {
        const insertSesion = `INSERT INTO token (dni_usuario, token) 
            VALUES (${this.conn.escape(usuario.dni)}, SHA2(NOW(), 256));`;
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
        WHERE dni_usuario = ${this.conn.escape(usuario.dni)} AND NOW() < DATE_ADD(fecha,INTERVAL 120 MINUTE)
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

    crearCiudad(ciudad) {
        const insertCiudad = `INSERT INTO ciudad (nombre) VALUES (${this.conn.escape(ciudad.nombre)});`;

        return new Promise((resuelve, rechazo) => {
            this.conn.query(insertCiudad, (error, resultado) => {
                if(error)
                    rechazo(error);
                
                resuelve(resultado);
            });
        })
    }

    crearSede(sede) {
        const insertSede = `INSERT INTO sede (codigo_ciudad, nombre, direccion)
            VALUES (${this.conn.escape(sede.codigo_ciudad)}, 
                ${this.conn.escape(sede.nombre)},
                ${this.conn.escape(sede.direccion)});`;

        return new Promise((resuelve, rechazo) => {
            this.conn.query(insertSede, (error, resultado) => {
                if(error)
                    rechazo(error);
                
                resuelve(resultado);
            });
        });
    }
}

module.exports = new DataBase(conn);
