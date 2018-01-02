import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, App, AlertController } from 'ionic-angular';

import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { ListapPage} from "../listap/listap";
import { EscanerPage} from "../escaner/escaner";
import { LoginPage} from "../login/login";
import {CatalogoPage} from "../catalogo/catalogo";
import {UbicacionPage} from "../ubicacion/ubicacion";

//Importando servicio
import {ProductoProvider} from '../../providers/producto/producto';


/**
 * Generated class for the MenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

  private rootPage;
  private listapPage;
  private escanerPage;
  private loginPage;
  private catalogoPage;
  private contactPage;
  private homePage;
  private ubicacionPage;

  usuario:any;


  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public app:App, 
              public alertCtrl:AlertController,
              private productoCtrl:ProductoProvider) {
  	
    this.usuario = this.navParams.get("parametro");
    console.log(this.usuario);
    this.rootPage=EscanerPage;
  	this.listapPage=ListapPage;
    this.escanerPage=EscanerPage;
    this.loginPage=LoginPage;
    this.catalogoPage=CatalogoPage;
    this.contactPage=ContactPage;
    this.homePage=HomePage;
    this.ubicacionPage=UbicacionPage;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

  openPage(p){
  	this.rootPage=p;
  }

  closePage(){
    //this.navCtrl.setRoot(LoginPage);
    window.caches.delete;
    this.app.getRootNav().setRoot(LoginPage);
  }

  presentConfirm() {
    let alert = this.alertCtrl.create({
      //title: 'Estas seguro que deseas salir?',
      message: 'Estas seguro que deseas salir?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Salir',
          handler: () => {
            this.closePage();
            this.productoCtrl.eliminarProductosList();
            console.log('Buy clicked');
          }
        }
      ]
    });
    alert.present();
  
  }


  openPagePerfil(){
    this.navCtrl.push(HomePage, {"data":this.usuario});
  }

  openPageMap(){
    this.navCtrl.push(UbicacionPage);
  }






}
