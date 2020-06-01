export class SitioTuristico {
    nombre: string;
    tipo: string;
    personalCargo?: string;
    ubicacion: string;
    descripcion: string;
    imagen: string;

    constructor() {
        this.nombre = '';
        this.tipo = '';
        this.descripcion = '';
        this.personalCargo = '';
        this.imagen = '';
        this.ubicacion = '';
    }
}