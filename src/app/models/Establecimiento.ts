export class Establecimiento{
  public id: string;
  public idUsuario: string;
  public servicios: any;
  public nit: string;
  public nombre: string;
  public telefono: string;
  public direccion: string;
  public email: string;
  public paginaWeb: string;
  public horarios: string;
  public horaInicial: string;
  public horaFinal: string;
  public descripcion: string;
  public imagen: string;

  constructor(){
    this.id = '';
    this.idUsuario = '';
    this.servicios = [];
    this.nit = '';
    this.nombre = '';
    this.telefono = '';
    this.direccion = '';
    this.email = '';
    this.paginaWeb = '';
    this.horarios = '';
    this.horaInicial = '';
    this.horaFinal = '';
    this.descripcion = '';
    this.imagen = '';
  }
}
