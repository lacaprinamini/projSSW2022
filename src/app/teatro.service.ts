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

  public setData(teatroPlatea: object): Observable<ArrayBuffer> 
   {
    var msg1 = JSON.stringify(teatroPlatea);
    
    return this.http.post<ArrayBuffer>(this.baseURL+ '/set?key=' + '1ea9441d', msg1 )
}
public getData(chiave: string): Observable<string> {
  return this.http.get<string>(this.baseURL+ '/get?key=' +chiave);
}
}