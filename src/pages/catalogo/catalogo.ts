import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , LoadingController} from 'ionic-angular';
import { ProductoPage } from '../producto/producto';

//Importando servicio
import {ProductoProvider} from '../../providers/producto/producto';

/**
 * Generated class for the CatalogoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-catalogo',
  templateUrl: 'catalogo.html',
})
export class CatalogoPage {

  productosList:any[]=[];
  numProductos:any;
  total:any;
  urlImg:string="http://127.0.0.1:8000/storage/";

  constructor(public navCtrl: NavController, public navParams: NavParams,private productoCtrl:ProductoProvider, public loadingCtrl:LoadingController) {
    //this.productosList=this.productoCtrl.obtenerProductos();
    console.log(this.productoCtrl.obtenerProductos());
   
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad CatalogoPage');

     let loading = this.loadingCtrl.create({
        content: 'Por favor espere...'
    });

    loading.present();
    this.productoCtrl.obtenerProductos().subscribe(
          data=>{
            console.log("OK.");
            this.productosList=data['data'];
            loading.dismiss();
          },
          err=>{
            console.error("Error: "+"err");
            loading.dismiss();
          })

  }


  ionViewWillEnter(){
    console.log("ionViewWillEnter !!");
    this.numProductos = this.productoCtrl.getProductosList().length;
    this.total = this.productoCtrl.getProductosListTotal(); 

  }



  openPage(i){
  	console.log("Open Page: "+i);
    console.log(this.productosList[i]);
  	this.navCtrl.push(ProductoPage, this.productosList[i]);
  }

  getUrlImg(product_image){
    console.log(product_image);
    return this.urlImg+product_image;
  }

}
