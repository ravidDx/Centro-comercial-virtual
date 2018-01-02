import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,LoadingController} from 'ionic-angular';

import { Stripe } from '@ionic-native/stripe';
import { Http, Headers } from '@angular/http';

//Importando servicio
import {ProductoProvider} from '../../providers/producto/producto';

/**
 * Generated class for the CardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-card',
  templateUrl: 'card.html',
})
export class CardPage {

  cardinfo: any = {
    number: '',
    expMonth: '',
    expYear: '',
    cvc: ''
  }

  total=0.00;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public stripe: Stripe, 
              public http: Http,
              public loadingCtrl: LoadingController,
              private productoCtrl:ProductoProvider) {
    this.total=this.navParams.get("data");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CardPage');
  }



  pay() {
    console.log("pay");

     let loading = this.loadingCtrl.create({
          content: 'Por favor espere...'
      });

    loading.present();

    
    
    this.stripe.setPublishableKey('pk_test_JHbWrPEj9G3ZoBLeCCZY5xPh');
  
    this.stripe.createCardToken(this.cardinfo)
         .then(
           token => {

             console.log(token.id);
             loading.dismiss();
             alert('transaction Successfull!!');
             this.productoCtrl.eliminarProductosList();          
             }

          )
         .catch(
           error => {
           console.error(error);
           loading.dismiss();
           alert(error);         

         });

     /*
    this.stripe.createCardToken(this.cardinfo).then((token) => {
        console.log("2");
      var data = 'stripetoken=' + token + '&amount=50';
      var headers = new Headers();
      headers.append('Conent-Type', 'application/x-www-form-urlencoded');
        console.log("3");
      this.http.post('http://localhost:3333/processpay', data, { headers: headers }).subscribe((res) => {
        if (res.json().success)
        alert('transaction Successfull!!')  
      })
    })

    */


  }
  

}
