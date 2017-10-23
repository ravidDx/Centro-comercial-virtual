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
  url:string = "http://servicios-raulbastidas654549.codeanyapp.com/users1.json";	
  url2:string = "http://servicios-raulbastidas654549.codeanyapp.com/users1/edit/";
   /*Servicio Restfull Cake PHP BD: PostgreSQL*/	
  //url:string = "http://tiendavirtual.local/users.json";  
  //url2:string = "http://tiendavirtual.local/users/edit/"; 
 

  constructor(public http: Http,private toastCtrl:ToastController) {
    console.log('Hello UsuarioProvider Provider');

  }

  obtenerUsuarios(email:string,password:string){
  	console.log("Obtener Usuarios");
    console.log(email);
    console.log(password);
    let access;
  	return this.http.get(this.url).map(
  		res => {
  			console.log("Consulta Get Usuario");
        let array = res.json();
        let user;
        for(let key in array['users1']) {
           if(email === array['users1'][key].email  && password === array['users1'][key].password ){
             console.log("True");
             access=true;
             user = array['users1'][key];
             break;
           }else{
             console.log("False");
              user = null;
              access=true;
           }
        }
        console.log(user)
  			return user;
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
        console.log("solicitud recibida");
        console.log(res.json());
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
