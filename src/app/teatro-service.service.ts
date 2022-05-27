import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class TeatroServiceService {

  constructor() { }
 
}
reateEPisode({
  var baseURL =
  'https://eu-central-1.aws.data.mongodb-api.com/app/kvaas-giwjg/endpoint';
var postit = [
  {
    titolo: 'cane',
    messaggio: 'comprare il cibo',
    importante: true
  }
];
var msg = JSON.stringify(postit);
fetch(baseURL + '/new?secret=ssw2022')  // new request
  .then(response => response.json(), error => console.log(error))
  .then(key => {
    console.log(key);
 })