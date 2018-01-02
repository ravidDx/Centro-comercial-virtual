import { Component } from '@angular/core';
import {  NavController , LoadingController} from 'ionic-angular';
import {ToastController,ModalController,AlertController} from 'ionic-angular';

//importando plugin scanner
import { BarcodeScanner} from "@ionic-native/barcode-scanner";
//Importando servicio
import {ProductoProvider} from '../../providers/producto/producto';
//slider




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
  imgScanned="assets/img/codigo_qr2.png";
  createdCode = null;
  scannedCode = null;
  scannedDescription=null;
  productoDescripcion="Comprar";

  producto:any={};
  productoId:any=1;
  loading:any;

  numProductos:any;
  total:any;



  constructor(private barcodeScanner: BarcodeScanner,
              private productoCtrl:ProductoProvider,
              public loadingCtrl: LoadingController,
              public toastCtrl:ToastController,
              public modalCtrl:ModalController,
              public alertCtrl:AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EscanerPage');
    /*
    this.storage.get('intro-done').then(done => {
      if (!done) {
        this.storage.set('intro-done', true);
        //this.navCtrl.setRoot(IntroPage);
      }
    });
    this.numProductos = this.productoCtrl.getProductosList().length;
    this.total = this.productoCtrl.getProductosListTotal(); 
    */
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
                     this.producto.discount=data['products'][key].discount;
                     this.producto.iva=data['products'][key].iva;
                     this.producto.stock=data['products'][key].stock;
                     this.imgScanned=data['products'][key].product_image;
                     this.productoDescripcion=this.producto.name+ " $"+this.producto.price;
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
                   this.producto.discount=data['products'][key].discount;
                   this.producto.iva=data['products'][key].iva;
                   this.producto.stock=data['products'][key].stock;
                   this.imgScanned=data['products'][key].product_image;
                   this.productoDescripcion=this.producto.name+"   " +"( $"+this.producto.price+" )";
                   break;
                 }else{
                   console.log("False");
                 }

              }

        },
        err=>{
          console.error("Error: "+"err");
          alert(err);
          this.loading.dismiss();
        }

      )

    });
  }

  //metodo para añadir al carrito de compras
  private comprar_si(){
    if(Object.keys(this.producto).length != 0){
      this.productoCtrl.guardarProducto(this.producto);
      this.presentToast();
      this.producto={};
      this.scannedCode = null;
      this.imgScanned="assets/img/codigo_qr2.png";
      this.productoDescripcion="Comprar";

      this.numProductos = this.productoCtrl.getProductosList().length;
      this.total = this.productoCtrl.getProductosListTotal(); 
      console.log("Producto añadido al carrito de compras");
      console.log("Lista de productos");  
    }
   
  }

    //metodo para no añadir al carrito de compras
  private comprar_no(){
    if(Object.keys(this.producto).length != 0){
      this.producto={};
      this.scannedCode = null;
      this.imgScanned="assets/img/codigo_qr2.png";
      this.productoDescripcion="Comprar"; 
      console.log("Producto no añadido al carrito de compras");
    }
   
  }


  //Lanzar mensaje 
  presentToast(){
    const toast = this.toastCtrl.create({
      message:'Producto añadido al carrito de compras',
      duration:3000,
      position:'top'
    });

    toast.present();
  }


  presentAlert(){
   const alert = this.alertCtrl.create({
     title:this.producto.name,
     subTitle:this.producto.description,
     message:"Precio: $ "+this.producto.price+"<br>"+
             "Descuento: "+this.producto.discount+"<br>"+
             "Iva: "+this.producto.iva+"<br>"+
             "Stock: "+this.producto.stock+"<br>",
     buttons:['OK']
   });
   alert.present();
  }

}
