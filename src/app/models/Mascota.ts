export class Mascota {
  public id: string;
  public idUsuario: string;
  public imagen: string;
  public nombre: string;
  public idTipo: string;
  public genero: string;
  public fechaNacimiento: string;
  public raza: string;
  public esterilizado: boolean;
  public color: string;
  public descripcion: string;

  constructor(nombre: string, idTipo: string, genero: string,
              fechaNamiciento: string, raza: string, esterilizado: boolean, color: string,
              descripcion: string, id?: string, imagen?: string, idUsuario?: string) {
    this.id = id;
    this.idUsuario = idUsuario;
    this.imagen = imagen;
    this.nombre = nombre;
    this.idTipo = idTipo;
    this.genero = genero;
    this.fechaNacimiento = fechaNamiciento,
    this.raza = raza;
    this.esterilizado = esterilizado;
    this.color = color;
    this.descripcion = descripcion;
  }
}
