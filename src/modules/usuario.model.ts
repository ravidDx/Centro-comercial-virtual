export class Usuario{
	nombres:string;
	apellidos:string;
	cedula:string;
	correo:string;
	password:string;

	constructor(correo:string,password:string){
		this.correo = correo;
		this.password = password;
	}
}