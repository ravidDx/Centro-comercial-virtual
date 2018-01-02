import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the ProductoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProductoProvider {

  //url:string = "http://tiendavirtual.local/products.json";  
  //url:string = "http://localhost/cakePHP/tiendaVirtual/products.json";
  //url:string = "http://servicios-raulbastidas654549.codeanyapp.com/products.json";
  url:string = "http://127.0.0.1:8000/api/product";

  private productosList:any[]=[];

  constructor(public http: Http) {
    console.log('Hello ProductoProvider Provider');
  }


  //Obtener Productos
  obtenerProductos(){
  	return this.http.get(this.url).map(
  		res => {
  			console.log("¡ Solicitud recibida !");
       	return res.json();
  		});
  }

  //Guardo el producto al carrito de compras
  guardarProducto(producto:any){
    console.log(producto);
    this.productosList.unshift(producto);  
    console.log(this.productosList);
  }

  
  getProductosList(){

    console.log("Num Prod");
    console.log(this.productosList);
    return this.productosList;
  }

  getProductosListTotal(){
    let totalPago=0;
    for(let key in this.productosList) {
      console.log(this.productosList[key].price);
      /*
      let costo:any=this.productosList[key].price.split("$ ");   
      this.totalPago=this.totalPago+parseFloat(costo[1]);
      console.log("total "+this.totalPago);
      */
      totalPago=totalPago+parseFloat(this.productosList[key].price);
    }
    return totalPago;
  }

  actualizarProductosList(productosList:any){
    this.productosList=productosList;

  }

  eliminarProductosList(){
    this.productosList = [];
  }

}
