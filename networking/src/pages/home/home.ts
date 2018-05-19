import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { BookFormPage } from '../book-form/book-form';
import { BookModel } from '../../model/BookModel';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  books: BookModel[] = [];

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    private http: Http
  ) {

    this.consumeWebService();

  }

  addNewBook() {
    this.navCtrl.push(BookFormPage);
  }

  doRefresh(refresher) {
    this.consumeWebService();
    refresher.complete();
  }

  consumeWebService() {

    var url = "https://baas.kinvey.com/appdata/kid_BJdgb3Scf/books";

    var headers: Headers = new Headers();
    headers.append("Authorization", "Basic a2lkX0JKZGdiM1NjZjpmNTdlZmE5NmUwODY0NzljYTE3MTI0MmY0YWJjODU2OA==");
    headers.append("X-Kinvey-API-Version", "3");
    headers.append("Content-Type", "application/json");

    this.http.get(url, {
      headers: headers
    }).map(res => res.json())
      .subscribe(
        res => {
          this.books = res;
          //console.log(res);
        },
        error => {
          console.log(error);
        });

  }

  edit(book: BookModel) {

    this.navCtrl.push(BookFormPage, { "bookModel": book })

  }

  delete(book: BookModel) {

    let alert = this.alertCtrl.create({
      title: "Borrar?",
      message: "Estás seguro de borrar el elemento?",
      buttons: [
        {
          text: "Sí",
          handler: () => {

            this.deleteBook(book);

          }
        },
        "No"
      ]
    });

    alert.present();

  }

  deleteBook(book: BookModel) {

    var url = "https://baas.kinvey.com/appdata/kid_BJdgb3Scf/books/" + book._id;

    var headers: Headers = new Headers();
    headers.append("Authorization", "Basic a2lkX0JKZGdiM1NjZjpmNTdlZmE5NmUwODY0NzljYTE3MTI0MmY0YWJjODU2OA==");
    headers.append("X-Kinvey-API-Version", "3");
    headers.append("Content-Type", "application/json");

    this.http.delete(
      url, //Url de la colección (ENDPOINT)
      {
        headers: headers
      })
      .map(res => res.json())
      .subscribe(
        res => {

          this.showMessage(`Se ha Eliminado el ID: ${book._id}`);

          this.consumeWebService();

          //console.log(res);
        },
        error => {
          console.log(error);

          this.showMessage("Ocurrió un error al eliminar el libro");
        });

  }

  showMessage(message: string) {

    let alert = this.alertCtrl.create({
      title: "Atención!",
      message: message,
      buttons: ["Aceptar"]
    });

    alert.present();

  }

}
