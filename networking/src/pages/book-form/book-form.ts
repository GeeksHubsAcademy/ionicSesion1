import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { BookModel } from '../../model/BookModel';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

/**
 * Generated class for the BookFormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-book-form',
  templateUrl: 'book-form.html',
})
export class BookFormPage {

  title: string = "";
  author: string = "";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public http: Http
  ) {
  }

  ionViewDidAppear() {
    console.log('ionViewDidLoad BookFormPage');
  }

  save() {

    if (this.title.length > 0 && this.author.length > 0) {

      //Guardar Libro
      let book: BookModel = {
        _id: null,
        bookTitle: this.title,
        bookAuthor: this.author,
        bookImage: "https://placeimg.com/100/100"
      }

      this.saveBook(book);

    } else {
      //Mostrar mensaje
      this.showMessage("No puede haber campos vacíos.")
    }

  }

  showMessage(message: string) {

    let alert = this.alertCtrl.create({
      title: "Atención!",
      message: message,
      buttons: ["Aceptar"]
    });

    alert.present();

  }

  saveBook(book: BookModel) {

    var url = "https://baas.kinvey.com/appdata/kid_BJdgb3Scf/books";

    var headers: Headers = new Headers();
    headers.append("Authorization", "Basic a2lkX0JKZGdiM1NjZjpmNTdlZmE5NmUwODY0NzljYTE3MTI0MmY0YWJjODU2OA==");
    headers.append("X-Kinvey-API-Version", "3");
    headers.append("Content-Type", "application/json");

    this.http.post(
      url, //Url de la colección (ENDPOINT)
      book, //La información a enviar (Request Body)
      {
        headers: headers
      })
      .map(res => res.json())
      .subscribe(
        res => {

          let newBook: BookModel = res;

          this.showMessage(`Se ha creado el ID: ${newBook._id}`);

          //console.log(res);
        },
        error => {
          console.log(error);

          this.showMessage("Ocurrió un error al guardar el libro");
        });

  }

}
