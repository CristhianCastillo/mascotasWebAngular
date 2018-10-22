export class Cita{
  public id: number;
  public idMascota: number;
  public nombre: string;
  public ubicacion: string;
  public tipoActividad: string;
  public fechaEvento: string;
  public horaEvento: string;
  public descripcionEvento: string;

  constructor(nombre?: string, ubicacion?: string, tipoActividad?: string, fechaEvento?: string, horaEvento?: string,
              descripcionEvento?: string, id?: number, idMascota?: number){
    this.id = id;
    this.idMascota = idMascota;
    this.ubicacion = ubicacion;
    this.nombre = nombre;
    this.ubicacion = ubicacion;
    this.tipoActividad = tipoActividad;
    this.fechaEvento = fechaEvento;
    this.horaEvento = horaEvento;
    this.descripcionEvento = descripcionEvento;
  }
}
