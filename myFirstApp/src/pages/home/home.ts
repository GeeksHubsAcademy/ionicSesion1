import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { SecondPage } from '../second/second';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  myString: String = ""

  constructor(
    public navCtrl: NavController,
    private alertCtl: AlertController
  ) {

  }

  performClick() {

    let alerta = this.alertCtl.create({
      title: "Alerta!!",
      message: "El valor de myString es: " + this.myString,
      buttons: ["Aceptar", "Cancel"]
    });

    alerta.present();

  }

  navegar(){

    this.navCtrl.push(SecondPage);

  }

}
