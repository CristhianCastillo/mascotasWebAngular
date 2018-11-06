export class Cita{
  public id: string;
  public idMascota: string;
  public nombre: string;
  public ubicacion: string;
  public tipoActividad: string;
  public fecha: string;
  public descripcionEvento: string;

  constructor(nombre?: string, ubicacion?: string, tipoActividad?: string, fechaEvento?: string,
              descripcionEvento?: string, id?: string, idMascota?: string){
    this.id = id;
    this.idMascota = idMascota;
    this.ubicacion = ubicacion;
    this.nombre = nombre;
    this.ubicacion = ubicacion;
    this.tipoActividad = tipoActividad;
    this.fecha = fechaEvento;
    this.descripcionEvento = descripcionEvento;
  }
}
