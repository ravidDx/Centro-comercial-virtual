import { Component } from '@angular/core';
import {  NavController , LoadingController} from 'ionic-angular';

import { BarcodeScanner} from "@ionic-native/barcode-scanner";

//Importando servicio
import {ProductoProvider} from '../../providers/producto/producto';



/**
 * Generated class for the EscanerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-escaner',
  templateUrl: 'escaner.html',
})
export class EscanerPage {
  qrData = null;
  imgScanned="assets/img/codigo_qr.png";
  createdCode = null;
  scannedCode = null;
  scannedDescription=null;

  producto:any={};

  productoId:any=1;


  loading:any;


  constructor(private barcodeScanner: BarcodeScanner,
              private productoCtrl:ProductoProvider,
              public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EscanerPage');
  }

  createCode() {
    this.createdCode = this.qrData;
  }

  scanCode() {
    this.barcodeScanner.scan().then(barcodeData => {
      this.scannedCode = barcodeData.text;
      this.loading = this.loadingCtrl.create({
        content: 'Por favor espere...'
      });


        this.loading.present();

        this.productoCtrl.obtenerProductos().subscribe(
          data=>{
            console.log("Consulta exitosa");
               for(let key in data['products']) {
                   if(parseInt(this.scannedCode) === data['products'][key].id_product ){
                     this.loading.dismiss();
                     console.log("True");
                     console.log("Producto: "+data['products'][key].product_name);
                     console.log("Precio: "+data['products'][key].priceu);
                     this.producto.id=this.scannedCode;
                     this.producto.name=data['products'][key].product_name;
                     this.producto.price=data['products'][key].priceu;
                     this.producto.description=data['products'][key].product_description;
                     this.imgScanned=data['products'][key].product_image;;

                     break;
                   }else{
                     console.log("False");
                   }

                }

          },
          err=>{
            console.error("Error: "+"err");
            this.loading.dismiss();
            this.scannedCode=err;

          })




    }, (err) => {
      console.log('Error: ', err);
      this.scannedCode = this.productoId;
      this.productoId= this.productoId+1;
      this.loading = this.loadingCtrl.create({
        content: 'Por favor espere...'
      });

      this.loading.present();

      this.productoCtrl.obtenerProductos().subscribe(
        data=>{
          console.log("Consulta exitosa");
             for(let key in data['products']) {
                 if(this.scannedCode === data['products'][key].id_product ){
                   this.loading.dismiss();
                   console.log("True");
                   console.log("Producto: "+data['products'][key].product_name);
                   console.log("Precio: "+data['products'][key].priceu);
                   this.producto.id=this.scannedCode;
                   this.producto.name=data['products'][key].product_name;
                   this.producto.price=data['products'][key].priceu;
                   this.producto.description=data['products'][key].product_description;
                   this.imgScanned=data['products'][key].product_image;;

                   break;
                 }else{
                   console.log("False");
                 }

              }

        },
        err=>{
          console.error("Error: "+"err");
        }

      )

    });
  }

  //metodo para añadir al carrito de compras
  private comprar_si(){
    console.log("Producto añadido al carrito de compras");
    console.log("Lista de productos");
    this.productoCtrl.guardarProducto(this.producto);
    this.producto={};
    this.scannedCode = null;
    this.imgScanned="assets/img/codigo_qr.png";
  }

    //metodo para no añadir al carrito de compras
  private comprar_no(){
    console.log("Producto no añadido al carrito de compras");
    this.producto={};
    this.scannedCode = null;
     this.imgScanned="assets/img/codigo_qr.png";

  }

}
