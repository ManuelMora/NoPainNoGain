class DataBase {
    constructor() {
        this.resultadoUsuarioToken = null;
        this.errorUsuarioToken = null;
        this.resultadoCrearSede = null;
        this.errorCrearSede = null;
    }

    __setResultadoCrearSede(resultado) {
        this.resultadoCrearSede = resultado;
        this.errorCrearSede = undefined;
    }

    __setErrorCrearSede(error) {
        this.errorCrearSede = error;
        this.resultadoCrearSede = undefined;
    }

    __setResultadoUsuarioToken(resultado) {
        this.resultadoUsuarioToken = resultado;
        this.errorUsuarioToken = undefined;
    }

    __setErrorUsuarioToken(error) {
        this.errorUsuarioToken = error;
        this.resultadoUsuarioToken = undefined;
    }

    getUsuarioToken(token) {
        return new Promise((resuelve, rechazo) => {
            if(this.errorUsuarioToken) rechazo(this.errorUsuarioToken);

            resuelve(this.resultadoUsuarioToken);
        });
    }

    crearSede() {
        return new Promise((resuelve, rechazo) => {
            if(this.errorCrearSede) rechazo(this.errorCrearSede);
            
            resuelve(this.resultadoCrearSede);
        });
    }
}

module.exports = new DataBase();