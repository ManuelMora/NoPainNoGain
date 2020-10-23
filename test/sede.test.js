const database = require('../src/modelo/__mocks__/database');
const Sede = require('../src/sede');

const resultadoUsuarioTokenAdmin = [{
    "dni": 1000000000,
    "codigo_nivel": 1,
    "codigo_sede": 1,
    "alias":"velka",
    "nombre":"admin",
    "apellido":"admin",
    "pass":"123456",
    "nombre_nivel":"administrador"
}];
const errorUsuarioToken = new Error('Error consultado por un usuario con una sesion activa.');
const token = 'ca7dec787805f63378d876ebf8e4353cf762f7ca09fcdc6906f2b76aec26dc1d';
const reqCrearSede = {
    body: {
        codigo_ciudad: 1,
        nombre: "sede2",
        direccion: "Cll 123 #1-1"
    },
    header: key => token
};
const Res = function() {
    this.status = codigo => this;
};

test(`Si el token es valido y retorna un usuario de tipo admin inserta la sede 
    y retorna los datos en formato JSON`, done => {
    database.__setResultadoUsuarioToken(resultadoUsuarioTokenAdmin);
    database.__setResultadoCrearSede({insertId: 2});
    const resCrearSede = new Res();
    resCrearSede.json = json => {
        expect(json).toEqual({
            codigo:2,
            codigo_ciudad: 1,
            nombre: "sede2",
            direccion: "Cll 123 #1-1"
        });
        done();
    }

    const sede = new Sede(database);
    sede.crearSede(reqCrearSede, resCrearSede);
});

test('Si se genera un error validando el token se retorna un JSON con la causa', done => {
    database.__setErrorUsuarioToken(new Error('Error generado al consultar en la base de datos'));
    const resCrearSede = new Res();
    resCrearSede.json = json => {
        expect(json).toEqual({error:'Error generado al consultar en la base de datos'});
        done();
    }

    const sede = new Sede(database);
    sede.crearSede(reqCrearSede, resCrearSede);
});

test('Si se genera un error insertando la sede se retorna un JSON con la causa', done => {
    database.__setResultadoUsuarioToken(resultadoUsuarioTokenAdmin);
    database.__setErrorCrearSede(new Error('Error generado al insertar en la base de datos'));
    const resCrearSede = new Res();
    resCrearSede.json = json => {
        expect(json).toEqual({error:'Error generado al insertar en la base de datos'});
        done();
    }

    const sede = new Sede(database);
    sede.crearSede(reqCrearSede, resCrearSede);
});
