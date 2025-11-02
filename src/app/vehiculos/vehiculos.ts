export class Vehiculo {
    id: number;
    marca: string;
    modelo: string
    linea: string;
    color: string
    kilometraje: number;
    imagen: string;
    referencia: string;

    constructor(id: number, marca: string, modelo: string, linea: string, color: string, kilometraje: number, imagen: string, referencia: string) {
        this.id = id;
        this.marca = marca;
        this.modelo = modelo;
        this.linea = linea;
        this.color = color;
        this.kilometraje = kilometraje;
        this.imagen = imagen;
        this.referencia = referencia;
    }
}
