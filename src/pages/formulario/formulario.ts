import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController,LoadingController } from 'ionic-angular';
//importar componentes de Ionic
import {FormBuilder, FormGroup, Validators, AbstractControl} from '@angular/forms';

import { TabsPage } from '../tabs/tabs';

//Importado Modelo
import {Usuario} from '../../modules/usuario.model';
//Importando Servicio
import {UsuarioProvider} from '../../providers/usuario/usuario';
//Importando TOAST ()Componente de IONIC 
import {Auth,User,UserDetails,IDetailedError} from '@ionic/cloud-angular';
 

/**
 * Generated class for the FormularioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-formulario',
  templateUrl: 'formulario.html',
})
export class FormularioPage {
  
  myForm : FormGroup;
  usuario:Usuario;

  constructor(public navCtrl: NavController, 
      			  public navParams: NavParams,
      			  private fb:FormBuilder,
              private usuarioCtrl:UsuarioProvider,
              private toastCtrl:ToastController,
              private auth:Auth,
              private user:User,
              public loadingCtrl: LoadingController) 
  {
  	this.myForm = this.crearMyForm();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FormularioPage');
  }

  //Metodo privado para crear formulario
  private crearMyForm(){
  	return this.fb.group({
  		nombres:['',Validators.required],
  		apellidos:['',Validators.required],
      direccion:['',Validators.required],
      telefono:['',Validators.required],
  		cedula:['',Validators.required],
  		email:['',[Validators.required,Validators.email ]],
      password: ['', Validators.required],
      /*
  		passwordRetry: this.fb.group({
	      password: ['', [Validators.required,Validators.pattern(/^[a-z0-9_-]{6,18}$/)] ],
	      passwordConfirmation: ['', [Validators.required,Validators.pattern(/^[a-z0-9_-]{6,18}$/)] ]
	    }),
      */
  	});
  }

  private guardarForm(){
  	console.log("Metodo gradar Form");
  	
     let loading = this.loadingCtrl.create({
          content: 'Por favor espere...'
      });

    loading.present();


    //this.usuario.nombres=this.myForm.value.nombres;
    //this.usuario.apellidos=this.myForm.value.apellidos;
    //this.usuario.cedula=this.myForm.value.cedula;
    //this.usuario.correo=this.myForm.value.email;
    //this.usuario.password=this.myForm.value.passwordRetry.password;

    //console.log(this.usuario);
    //Estos parametros deben tener el mismo nombre que las columnas de la tabla
    let user ={
      "first_name": this.myForm.value.nombres,
      "last_name": this.myForm.value.apellidos,
      "address": this.myForm.value.direccion,
      //"reference": this.myForm.value.referencia,
      "phone_number": this.myForm.value.telefono,
      "identification_card": this.myForm.value.cedula,
      "role": "Usuario",
      "email": this.myForm.value.email,
      "password": this.myForm.value.passwordRetry.password,
      "active": "1"
    }

    this.usuarioCtrl.registrarUsuario(user).subscribe(
       res=>{
         this.lanzarMensaje();
         console.log("Guardado Form Exitos");
         console.log(res);
         loading.dismiss();

        let details:UserDetails ={'email':user.email, 'password':user.password}
        this.navCtrl.setRoot(TabsPage,{'parametro':user});  
      
          /*
          this.auth.signup(details).then(() => {
            console.log('ok signup');
            this.auth.login('basic', {'email':user.email, 'password':user.password}).then(() => {
              console.log("ok login");
              this.navCtrl.setRoot(TabsPage,{'parametro':user});  
            });


          });
          */

         //this.navCtrl.pop();
       }
     );
  }

  private lanzarMensaje(){
      let toast = this.toastCtrl.create({
        message:'Registro Exitoso',
        duration:2000
      });
      toast.present();
    }


}
