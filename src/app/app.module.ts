import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Stripe } from '@ionic-native/stripe';

import {CloudSettings,CloudModule} from '@ionic/cloud-angular';

import { MyApp } from './app.component';

/*ESCANER*/
import {BarcodeScanner} from "@ionic-native/barcode-scanner";

/*Componentes*/
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { ListapPage } from "../pages/listap/listap";
import  { EscanerPage} from "../pages/escaner/escaner";
import { PagosPage} from "../pages/pagos/pagos";
import { UbicacionPage} from "../pages/ubicacion/ubicacion";
import {FormularioPage} from '../pages/formulario/formulario'
import { LoginPage } from '../pages/login/login';
import {CardPage} from '../pages/card/card';
import {MenuPage} from '../pages/menu/menu';
import {CatalogoPage} from '../pages/catalogo/catalogo';
import {ProductoPage} from '../pages/producto/producto';

/*Servicio*/
import { UsuarioProvider } from '../providers/usuario/usuario';
import {HttpModule} from '@angular/http';
import { ProductoProvider } from '../providers/producto/producto';
import { CatalogoProvider } from '../providers/catalogo/catalogo';

import { GoogleMaps } from '@ionic-native/google-maps';
//slider
//import { Storage } from '@ionic/storage';


const cloudSettings:CloudSettings={
  'core':{
    'app_id':'c37a4bd6'
  }
};


@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    ListapPage,
    EscanerPage,
    PagosPage,
    UbicacionPage,
    LoginPage,
    FormularioPage,
    CardPage,
    MenuPage,
    CatalogoPage,
    ProductoPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    CloudModule.forRoot(cloudSettings)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    ListapPage,
    EscanerPage,
    PagosPage,
    UbicacionPage,
    LoginPage,
    FormularioPage,
    CardPage,
    MenuPage,
    CatalogoPage,
    ProductoPage
  ],
  providers: [
    //Storage,
    StatusBar,
    SplashScreen,
    BarcodeScanner,
    UsuarioProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ProductoProvider,
    Stripe,
    CatalogoProvider,
    GoogleMaps,

  ]

})
export class AppModule {}
