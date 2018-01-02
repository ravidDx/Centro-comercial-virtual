import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker
} from '@ionic-native/google-maps';

/**
 * Generated class for the UbicacionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-ubicacion',
  templateUrl: 'ubicacion.html',
})
export class UbicacionPage {

  latitud: number =-0.19680938164895773;
  longitud: number = -78.479998111724811172485;

   map: GoogleMap;

  constructor(
    private navCtrl: NavController,
    private googleMaps: GoogleMaps
  ) {}

  ionViewDidLoad(){
    this.loadMap();
  }

  loadMap(){

	    let mapOptions: GoogleMapOptions = {
	      camera: {
	        target: {
	          lat: 43.0741904, // default location
	          lng: -89.3809802 // default location
	        },
	        zoom: 18,
	        tilt: 30
	      }
	    };

	    this.map = this.googleMaps.create('map_canvas', mapOptions);

	    // Wait the MAP_READY before using any methods.
	    this.map.one(GoogleMapsEvent.MAP_READY)
	    .then(() => {
	      // Now you can use all methods safely.
	      this.getPosition();
	    })
	    .catch(error =>{
	      console.log(error);
    	});

  }

  getPosition(): void{
	    this.map.getMyLocation()
	    .then(response => {
	      this.map.moveCamera({
	        target: response.latLng
	      });
	      this.map.addMarker({
	        title: 'My Position',
	        icon: 'blue',
	        animation: 'DROP',
	        position: response.latLng
	      });
	    })
	    .catch(error =>{
	      console.log(error);
	    });
  }



}
