import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class kvaasService {
  baseURL: string =
  'https://eu-central-1.aws.data.mongodb-api.com/app/kvaas-giwjg/endpoint';
  data: string;
  constructor(private http: HttpClient) { }

  public setData(teatro: object, key:string): Observable<string> {
    // var msg = JSON.stringify(teatro);
    // fetch(this.baseURL + '/set?key=' + key, { method: 'POST', body: msg }) 
    // .then(response => response.json(), error => console.log(error))
    // .then(data => {
     return this.http.get<string>(this.baseURL+CityName);
    });
  
}
}