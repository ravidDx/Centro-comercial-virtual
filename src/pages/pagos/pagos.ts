import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { CardPage } from '../card/card';


/**
 * Generated class for the PagosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

/*@IonicPage()*/
@Component({
  selector: 'page-pagos',
  templateUrl: 'pagos.html',
})
export class PagosPage {

  constructor( public navCtrl: NavController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PagosPage');
  }


  carddetails() {
    this.navCtrl.push(CardPage);
  }


}
