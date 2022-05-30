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

  public setData(teatro: object): Observable<ArrayBuffer> {
    var msg = JSON.stringify(teatro);
   
     return this.http.post<ArrayBuffer>(this.baseURL+ '/set?key=' + '1ea9441d', msg )
    
  
}
}