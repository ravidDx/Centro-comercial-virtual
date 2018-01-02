import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//Importando servicio
import {ProductoProvider} from '../../providers/producto/producto';


/**
 * Generated class for the ProductoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-producto',
  templateUrl: 'producto.html',
})
export class ProductoPage {
 producto:any;



  constructor(public navCtrl: NavController, public navParams: NavParams,private productoCtrl:ProductoProvider) {
  	this.producto = this.navParams.data;
	  console.log(this.producto);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductoPage');
  }


  comprar_no(){
  	this.navCtrl.pop();
  }

  comprar_si(){

    console.log(this.producto);
    let producto:any={};
    producto.id=this.producto.id_product;
    producto.name=this.producto.product_name;
    producto.price=this.producto.priceu;
    producto.description=this.producto.product_description;
    producto.discount=this.producto.discount;
    producto.iva=this.producto.iva;
    producto.stock=this.producto.stock; 
    this.productoCtrl.guardarProducto(producto);
      //this.presentToast();
    this.navCtrl.pop();
    
  }

}
