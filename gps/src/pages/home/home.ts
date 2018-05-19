import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  latitude: number = 0
  longitude: number = 0

  constructor(
    public navCtrl: NavController,
    public geolocation: Geolocation
  ) {

    this.configureGPS();
  }

  configureGPS() {

    this.geolocation.getCurrentPosition()
      .then((resp) => {

        this.latitude = resp.coords.latitude;
        this.longitude = resp.coords.longitude;

      }).catch((error) => {
        console.log('Error getting location', error);
      });

    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      // data can be a set of coordinates, or an error (if an error occurred).
      if (data.coords != null) {
        this.latitude = data.coords.latitude;
        this.longitude = data.coords.longitude;
      }

    });
  }

}
