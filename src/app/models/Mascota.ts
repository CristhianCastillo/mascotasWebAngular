export class Mascota {
  public id: number;
  public imagen: string;
  public nombre: string;
  public tipoMascota: string;
  public genero: string;
  public fechaNacimiento: string;
  public raza: string;
  public esterilizado: string;
  public color: string;
  public descripcion: string;
  public idDuenio: number;

  constructor(nombre: string, tipoMascota: string, genero: string,
              fechaNamiciento: string, raza: string, esterilizado: string, color: string,
              descripcion: string, idDuenio: number, id?: number, imagen?: string) {
    this.id = id;
    this.imagen = imagen;
    this.nombre = nombre;
    this.tipoMascota = tipoMascota
    this.genero = genero;
    this.fechaNacimiento = fechaNamiciento,
    this.raza = raza;
    this.esterilizado = esterilizado;
    this.color = color;
    this.descripcion = descripcion;
    this.idDuenio = idDuenio;
  }
}
