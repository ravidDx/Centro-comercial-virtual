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
  url:string = "http://servicios-raulbastidas654549.codeanyapp.com/products.json";

  private productosList:any[]=[];

  constructor(public http: Http) {
    console.log('Hello ProductoProvider Provider');
  }


  //Obtener Productos
  obtenerProductos(){
  	console.log("Consultando Productos de la BD");
  	return this.http.get(this.url).map(
  		res => {
  			console.log("Consulta Get Producto");
  			console.dir(res.json());
  			return res.json();
  		});
  }

  //Guardo el producto al carrito de compras
  guardarProducto(producto:any){
    this.productosList.unshift(producto);  
  }

  getProductosList(){
    return this.productosList;
  }

  actualizarProductosList(productosList:any){
    this.productosList=productosList;

  }


  

}
