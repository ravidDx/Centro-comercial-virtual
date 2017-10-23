import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { ListapPage} from "../listap/listap";
import { EscanerPage} from "../escaner/escaner";
import { LoginPage} from "../login/login";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = EscanerPage;
  tab2Root = ListapPage;
  tab3Root = HomePage;
  tab4Root = ContactPage;
  tab5Root = LoginPage;

  usuario:any;

  constructor(public navParams: NavParams) {
  		console.log("Constructor Tabs");
  	  	//recibiendo parametros
	  	this.usuario = this.navParams.get("parametro");
	  	console.log(this.usuario);
  }


  logout(){
    console.log("fin de sesion");
  }
}
