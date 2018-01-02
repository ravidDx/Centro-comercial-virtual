import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
//Importado modelo
import {Usuario} from '../../modules/usuario.model';
//Importando Componente TOAS de IONIC
import { ToastController } from 'ionic-angular';

/*
  Generated class for the UsuarioProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UsuarioProvider {


  /*Servicio Restfull Cake PHP BD: MSQL*/
  //url:string = "http://servicios-raulbastidas654549.codeanyapp.com/users1.json";	
 // url2:string = "http://servicios-raulbastidas654549.codeanyapp.com/users1/edit/";
   /*Servicio Restfull Cake PHP BD: PostgreSQL*/	
  //url:string = "http://tiendavirtual.local/users.json";  
  //url2:string = "http://tiendavirtual.local/users/edit/"; 

  /*Servicio Restfull Laravel PHP BD: PostgreSQL*/ 
  url:string = "http://127.0.0.1:8000/api/user/";
  url2:string = "http://127.0.0.1:8000/user_api/"; 
 

  constructor(public http: Http,private toastCtrl:ToastController) {
    console.log('Hello UsuarioProvider Provider');

  }

  obtenerUsuarios(email:string,password:string){
  	
    console.log(email);
    console.log(password);
 
  	return this.http.get(this.url+email+"%20"+password).map(
  		res => {
  			console.log("Obtener Usuarios");
        let array = res.json();
  			return array;
  		},
      err=>{
        console.error(err);
      });
  }

  registrarUsuario(usuario:any){

    console.log("Registrar usuario");
    this.lanzarMensaje();
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    let options = new RequestOptions({ headers: headers });
 
    
    //let body = JSON.stringify(usuario);
    console.log(usuario);
    return this.http.post(this.url,usuario,options).map(
      res =>{
        console.log("¡ Solicitud recibida !");
        return res.json();
      },
      err =>{
        console.log(err);
      }
    )

  }

  actualizarUsuario(usuario:any,id:any){
    console.log("Actualizar usuario");
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    let options = new RequestOptions({ headers: headers });
    let body=JSON.stringify(usuario);

    console.log(usuario);
    return this.http.put(this.url2+id+".json",body,options).map(
      res =>{
        console.log("solicitud recibida update");
        console.dir(JSON.parse(res.text()) );
        return JSON.parse(res.text());
      }
    )

  }


    private lanzarMensaje(){
      let toast = this.toastCtrl.create({
        message:'Guardando Usuario .....',
        duration:3000,
        position:'top'
      });
      toast.present();
    }


}
