import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';

/* CRUD DATOS FIREBASE*/
//import { AngularFireDatabase} from "angularfire2/database";
//import { FirebaseListObservable} from "angularfire2/database";
import { AlertController, App} from "ionic-angular";

import { PagosPage} from "../pagos/pagos";
import { UbicacionPage} from "../ubicacion/ubicacion";

//Importando servicio
import {ProductoProvider} from '../../providers/producto/producto';
import { CardPage } from '../card/card';


/**
 * Generated class for the ListapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-listap',
  templateUrl: 'listap.html',
})
export class ListapPage {


  latitud: number = 0;

  productosList:any[]=[];
  private totalPago:any;

 // productosList: FirebaseListObservable<any>;
 /*
  constructor(public navCtrl: NavController, public alertController: AlertController ,
              public af: AngularFireDatabase) {
    this.productosList = af.list('/productos');

    this.productosList.forEach(item => {
      console.log('Item:', item.price);
    });



  }

  */



  constructor(public navCtrl: NavController,private productoCtrl:ProductoProvider, private alertController:AlertController,public appCtrl:App ) {

    console.log("Constructor List Provider");
    this.productosList=this.productoCtrl.getProductosList();
    
    console.log(this.productosList);
   
    /*
    this.productosList = af.list('/productos');
    this.productosList.forEach(item => {
      console.log('Item:', item.price);
    });*/


  }
 
  //Se ejecuta cuando la pagina esta activa
  ionViewDidEnter(){
    console.log("ionViewDidEnter");
    this.calcularPago();
  }




  createProducto(){

    console.log("create product");
    
    let newProductModal = this.alertController.create(
      {
       title: "Nuevo Producto",
        message: "Crea un nuevo producto",
        inputs: [
          {
            name: "nombre",
            placeholder: "Nombre"
          },
          {
            name: "precio",
            placeholder: "Precio"
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
            this.productosList.push(
              {
                name: data.nombre,
                price: data.precio
              }
            )
          }
        }

      ]

      }
    );
    newProductModal.present(newProductModal);

    
  }

  deleteContact(product) {
    /*
    this.productosList.remove(product);*/
  }


  actualizarProducto(producto){
    /*
    let updateProductModal = this.alertController.create(
      {
        title: "Actualizar Producto",
        message: "Edita Informacion del Producto",
        inputs: [
          {
            name: "nombre",
            placeholder: "Nombre",
            value: producto.name
          },
          {
            name: "precio",
            placeholder: "Precio",
            value: producto.price
          }
        ], buttons: [
        {
          text: "Cancelar",
          handler: data => {
            console.log("Cancel Click");
          }
        },{
          text: "Actualizar",
          handler: data => {
            this.productosList.update(producto.$key,
              {
                name: data.nombre,
                price: data.precio
              }
            )
          }
        }

      ]

      }
    );
    updateProductModal.present(
      updateProductModal);*/
  }

 pagar(){
      //this.navCtrl.push(PagosPage, {"data":this.totalPago} );
      this.appCtrl.getRootNav().push(PagosPage, {"data":this.totalPago} );
  }
  
  
  private calcularPago() {
    this.totalPago=0;
    console.log(this.productosList);
    for(let key in this.productosList) {
      console.log(this.productosList[key].price);
      /*
      let costo:any=this.productosList[key].price.split("$ ");   
      this.totalPago=this.totalPago+parseFloat(costo[1]);
      console.log("total "+this.totalPago);
      */

      this.totalPago=this.totalPago+parseFloat(this.productosList[key].price);
      console.log("total "+this.totalPago);

    }

  }

  verUbicacion() {
    this.navCtrl.push(UbicacionPage);
  }

  private eliminarProducto(id:any){
    console.log("Elimijnar Producto de carrito de compras: "+id);
    this.productosList.splice(id,1);
    this.calcularPago();
  }

   carddetails() {
    this.navCtrl.push(CardPage);
  }


}
