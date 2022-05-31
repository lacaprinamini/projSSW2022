
import { Component, VERSION, Input } from '@angular/core';
import { kvaasService } from "./teatro.service";

class posti {
  nfile: number;
  nposti: number;
  postiNome: object;
  constructor(nfile: number,
    nposti: number, postiNome: object) {

      let posti= Array(nfile).fill("").map(() => Array(nposti).fill("x"));
    const postoNome = [{posto:"", nome:""}];
    posti.map((fila, i) => {
        fila.map((nome, j) => { 
          const posto= 'P'+(j+1)+(i+1); 
          postoNome .push({posto: posto, nome: nome});
      });
      
    });
    
    postoNome.splice(0,1);
    
    this.postiNome= postoNome;
    
  }
}
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  platea: posti;
  palchi: posti;
  postiPlatea: string[]=[];
  postiPalchi: string[]=[];
  color: "";
  divStyle: string;
  nominativo: string;
  chiave: any;
  p: any;
  constructor(private query: kvaasService) {
    

  const n = {
    filePlatea: 7,
    postiPlatea: 10,    
    filePalchi: 4,
    postiPalchi: 6
    }
    let nomiPlatea=Object;
    let nomiPalchi=Object;

        this.platea= new posti(n.filePlatea, n.postiPlatea, nomiPlatea);
        
        this.palchi= new posti(n.filePalchi, n.postiPalchi, nomiPalchi);
        
        for (var k in this.platea["postiNome"]){
          let posto=this.platea["postiNome"][k]['posto'];
          // console.log(posto);
          this.postiPlatea.push(posto);
        }
        
        for (var k in this.palchi["postiNome"]){
          let posto=this.palchi["postiNome"][k]['posto'];
          // console.log(posto);
          this.postiPalchi.push(posto);
        }
        // let res="";
        // this.query.setData(this.platea).subscribe({
        // next: (x: any) => (console.log(x)),
        // error: err => console.error("Observer got an error: " + JSON.stringify(err))
//         var msg = JSON.stringify(this.platea);
// fetch( 'https://eu-central-1.aws.data.mongodb-api.com/app/kvaas-giwjg/endpoint' + '/new?secret=ssw2022')  // new request
//   .then(response => response.json(), error => console.log(error))
//   .then(key => {
//     console.log(key);
//     fetch( 'https://eu-central-1.aws.data.mongodb-api.com/app/kvaas-giwjg/endpoint' + '/set?key=' + key, { method: 'POST', body: msg }) // set request
//       .then(response => response.json(), error => console.log(error))
//       .then(data => {
//         console.log(data);
//         fetch('https://eu-central-1.aws.data.mongodb-api.com/app/kvaas-giwjg/endpoint' + '/get?key=' + key)  // get request
//           .then(response => response.json(), error => console.log(error))
//           .then(data => {
//             console.log(data);
//       });
//     });
        
// });
// this.query.setData(this.platea).subscribe({
        // next: (x: any) => (console.log(x)),
        // error: err => console.error("Observer got an error: " + JSON.stringify(err))
        
        
this.p="ff"
        
          
  }

      receiveKey($event) { 
        this.chiave = $event; 
        
      }
      receiveNominativo($event) { 
        this.nominativo = $event; 
      }
      

         imposta(posto: string){   
      // console.log("Prenotato a " + this.nominativo + " il posto " + posto);
      //console.log(this.chiave)
      for (var k in this.platea["postiNome"]){
        if(this.platea["postiNome"][k]['posto']==posto){
          this.platea["postiNome"][k]['nome']=this.nominativo;
        }
      }
      this.query.setData(this.platea).subscribe({
        next: (x: any) => (console.log(x)),
        error: err => console.error("Observer got an error: " + JSON.stringify(err))
        });
        
      this.nominativo=undefined;
      
       
         }
         getColor(){
           
          return this.p="ff" ? 'red' : 'green';}

}

// fare prima get e vedere teatro per vedere posti occupati e segnarli di rosso con this.style