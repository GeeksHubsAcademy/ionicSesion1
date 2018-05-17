import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


  books: any[] = [];

  constructor(
    public navCtrl: NavController,
    private http: Http
  ) {

    this.consumeWebService();

  }


  consumeWebService() {

    var url = "https://baas.kinvey.com/appdata/kid_BJdgb3Scf/books";

    var headers: Headers = new Headers();
    headers.append("Authorization", "Basic a2lkX0JKZGdiM1NjZjpmNTdlZmE5NmUwODY0NzljYTE3MTI0MmY0YWJjODU2OA==");
    headers.append("X-Kinvey-API-Version", "3");
    headers.append("Content-Type", "application/json")

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

}
