import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,LoadingController } from 'ionic-angular';
//importar componentes de Ionic
import {FormBuilder, FormGroup, Validators, AbstractControl} from '@angular/forms';
//importar componentes propios
import { FormularioPage } from '../formulario/formulario';
import { HomePage } from '../home/home';
import { TabsPage } from '../tabs/tabs';
import { MenuPage } from '../menu/menu';

//Importando sefvicio
import {UsuarioProvider} from '../../providers/usuario/usuario';

//import {Auth,User,UserDetails,IDetailedError} from '@ionic/cloud-angular';
 
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {

  username: AbstractControl;
  password:AbstractControl;
  errorMessage:string = null;
  loginForm : FormGroup;	
  hidden=true;

  constructor(public navCtrl: NavController, 
  		 	      public navParams: NavParams,
  		 	      private fb:FormBuilder,
              private usuarioCtrl:UsuarioProvider,
              public loadingCtrl: LoadingController) 
  {

  	this.loginForm = fb.group({
  		'username' : ['',Validators.compose([Validators.required])],
		  'password' : ['',Validators.compose([Validators.required])],
  	});

  	this.username = this.loginForm.controls['username'];
  	this.password = this.loginForm.controls['password'];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }


  //Metodo privado para iniciar sesion
  private login() {
  	//logica de validación acá
    console.log("Iniciar Sesion");
    
      let loading = this.loadingCtrl.create({
          content: 'Por favor espere...'
      });

    loading.present();

    this.usuarioCtrl.obtenerUsuarios(this.username.value,this.password.value).subscribe(
      data=>{
      
        loading.dismiss();
       

           if(data.status=='200'){
             console.log("ok");
             console.log(data);
             this.navCtrl.setRoot(MenuPage,{'parametro':data});
             
           }else{
             console.log("err");
             this.errorMessage=data.msg;          
           }

           
      },
      err=>{
        console.error("err");
        this.errorMessage=err;
        loading.dismiss();
      }
    );
  	
  }

 //Metodo privado para registrar usuario
  private registrar(){
    console.log("Registrar");
    this.navCtrl.push(FormularioPage);
  }


  private entrar(){
    console.log("Registrar");

    let data={
      "first_name": "Raul",
      "last_name": "Bastidas",
      "address": "Humbolt y Coruña",
      "reference": "casa de 3 pisos verde",
      "phone_number": 998765432,
      "identification_card": 1234567891,
      "role": "undefined",
      "email": "r@r.com",
      "password": "123123",
      "active": "1"
    }

      console.log(this.username.value);
      console.log(this.password.value);

      //let details:UserDetails ={'email':this.username.value, 'password':this.password.value}
      //console.log(details);

     
        /*this.auth.login('basic', {'email':this.username.value, 'password':this.password.value}).then(() => {
          console.log("login tue");
          //this.navCtrl.setRoot(HomePage);
          this.navCtrl.setRoot(TabsPage,{'parametro':data}); 
        });
        */




        /*
    this.auth.login('basic', {'email':this.username.value, 'password':this.password.value}).then(() => {
      console.log('ok i guess?');
      this.loading.dismissAll();
       this.navCtrl.setRoot(TabsPage,{'parametro':data});     
    },(err)=>{
      console.log(err);
    }
    );
    */


   
  }



 


}
