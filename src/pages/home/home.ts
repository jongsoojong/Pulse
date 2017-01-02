import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from 'ionic-native';
import { CreateBeaconPage } from '../create-beacon/create-beacon'
declare var google;
 
@Component({
  selector: 'home-page',
  templateUrl: 'home.html'
})
export class HomePage {

  createBeacon: any = CreateBeaconPage;
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  
  constructor(public navCtrl: NavController) {}
 
  ionViewDidLoad(){
    this.loadMap();
  }
 
  loadMap(){
 
    Geolocation.getCurrentPosition()
      .then((position) => {
 
        let center = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
  
        let mapOptions = {
          center: center,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }
  
        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  
      }, (err) => {
        console.log(err);
      });
 
  }

  addBeacon(){
 
    let beacon = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });
    localStorage.setItem('currentLocation', beacon.position)
    let content = "TEST";          
  
    this.addInfoWindow(beacon, content);
 
  }

  addInfoWindow(beacon, content){
 
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });
  
    google.maps.event.addListener(beacon, 'click', () => {
      infoWindow.open(this.map, beacon);
    });
  
    }
}
