import { Component } from '@angular/core';
import { NavController,NavParams ,AlertController, LoadingController, Alert} from 'ionic-angular';
import { MenuPage} from "../menu/menu";
//Importando sefvicio
import {UsuarioProvider} from '../../providers/usuario/usuario';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  usuario:any;



  constructor(private navParams: NavParams,
              private alertController:AlertController,
              private usuarioCtrl:UsuarioProvider, 
              public loadingCtrl: LoadingController) {
  	
    console.log("Constructor HOME (Page Perfil User)");
  	//this.usuario = navParams.data;
    this.usuario=this.navParams.get("data");
    //this.usuario=this.usuario['data'];
  	console.log(this.usuario);
  	console.log(this.usuario.first_name);
  	console.log(this.usuario.last_name);

  }




  private modificarUsuario1(){


    console.log("modificar user");

     let loading = this.loadingCtrl.create({
        content: 'Por favor espere...'
    });

    
    let updateUserModal = this.alertController.create(
      {
       title: "Actualización",

        //message: "Modifica usuario",
        inputs: [
          {
            name: "nombre",
            label:"Nombre",
            value: this.usuario.first_name
          },
          {
            name: "apellido",
            value: this.usuario.last_name
          },
          {
            name: "direccion",
            value: this.usuario.address
          },
          {
            name: "referencia",
            value: this.usuario.reference
          },
          {
            name: "telefono",
            value: this.usuario.phone_number
          },
          {
            name: "cedula",
            value: this.usuario.identification_card
          },
          {
            name: "email",
            value: this.usuario.email
          },
          {
            name: "password",
            value: this.usuario.password
          }
        ], buttons: [
        {
          text: "Cancelar",
          handler: data => {
            console.log("Cancel Click");
          }
        },{
          text: "Guardar",
          handler: data => {


            let usuario={
              "first_name": data.nombre,
              "last_name": data.apellido,
              "address": data.direccion,
              "reference": data.referencia,
              "phone_number": data.telefono,
              "identification_card": data.cedula,
              "role": "undefined",
              "email": data.email,
              "password": data.password,
              "active": "0"
            }

            console.log(usuario);
            loading.present();


            this.usuarioCtrl.actualizarUsuario(usuario,this.usuario.id_user).subscribe(
              data=>{
                console.log("Consulta Exitosa");
          
                console.log(data);

                 for(let key in data['users1']) {
           
                   if(this.usuario.id_user === data['users1'][key].id_user){
                     console.log("True");
                     this.usuario = data['users1'][key];           
                                    
                     break;
                   }else{
                     console.log("False");
                     
                   }

                }
               loading.dismiss();


              },
              err=>{
                console.error("err");

              }
            );

            

            

            /*
            this.productosList.push(
              {
                name: data.nombre,
                price: data.precio
              }
            )
            */
          }
        }

      ],

      cssClass:"modal"


      }
    );




    updateUserModal.present(updateUserModal);
    
  }

  private modificarUsuario(value, name){
     let loading = this.loadingCtrl.create({
        content: 'Por favor espere...'
    });


    let prompt = this.alertController.create({
      title: name,
      message: '',
      inputs: [
        {
          name: "name",
          placeholder:value,
        }
      ],

      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Actualizar',
          handler: data => {
            console.log('Saved clicked');

            if(name == 'Nombres' ){
              this.usuario.first_name=data.name;
            }else if(name == 'Apellidos'){
              this.usuario.last_name=data.name;
            }else if(name == 'Cedula'){
              this.usuario.identification_card=data.name;
            }else if(name == 'Email'){
              this.usuario.email=data.name;
            }else if(name == 'Dirección'){
              this.usuario.address=data.name;
            }else if(name == 'Referencia'){
              this.usuario.reference=data.name;
            }else if(name == 'Teléfono'){
              this.usuario.phone_number=data.name;
            }else if(name == 'Password'){
              this.usuario.password=data.name;
            }

            
            loading.present();


            this.usuarioCtrl.actualizarUsuario(this.usuario,this.usuario.id_user).subscribe(
              data=>{
                console.log("Consulta Exitosa");
          
                console.log(data);

                 for(let key in data['users1']) {
           
                   if(this.usuario.id_user === data['users1'][key].id_user){
                     console.log("True");
                     this.usuario = data['users1'][key];           
                                    
                     break;
                   }else{
                     console.log("False");
                     
                   }

                }
               loading.dismiss();


              },
              err=>{
                console.error("err");

              }
            );

          }
        }
      ]
    });

    prompt.present();




  }






}
