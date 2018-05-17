import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  items: String[] = ["UNO", "DOS", "TRES"];

  constructor(
    private navCtrl: NavController,
    private alertCtrl: AlertController
  ) {

  }

  itemSelected(item: string) {

    this.showMessage(item);

  }

  callTapped(item: string) {

    this.showMessage(`Llamando ${item}`);

  }

  textTapped(item: string) {

    this.showMessage(`SMS ${item}`);

  }

  emailTapped(item: string) {

    this.showMessage(`Mail ${item}`);

  }

  showMessage(message: string) {

    this.alertCtrl.create({

      title: "Opción seleccionada!",
      subTitle: "Subtitulo",
      message: message,
      buttons: [
        {
          text: "Aceptar",
          handler: () => {
            console.log("Aceptar");
          }
        },
        {
          text: "Cancelar",
          handler: () => {
            console.log("Cancelar");
          }
        }
      ]

    }).present();
  }

}
