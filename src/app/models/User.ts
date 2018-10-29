export class User{
  public id: string;
  public idTipo: string;
  public nombre: string;
  public apellidos: string;
  public email: string;
  public nombreUsuario: string;
  public password: string;
  public estado: boolean;

  constructor(nombre: string, apellidos: string, email: string,
              nombreUsuario: string, password: string, estado?: boolean, id?: string, idTipo?: string){
    this.nombre = nombre;
    this.apellidos = apellidos;
    this.email = email;
    this.nombreUsuario = nombreUsuario;
    this.password = password;
    this.estado = estado;
    this.id = id;
    this.idTipo = idTipo;
  }
}
