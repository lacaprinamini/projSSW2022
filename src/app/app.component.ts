
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
  nominativo: string;
  chiave: any;
 
  constructor(private query: kvaasService) {}
      receiveKey($event) { 
        this.chiave = $event; 
        let nomiPlatea=Object;
        this.platea= new posti(7, 10, nomiPlatea);
        this.query.getData(this.chiave).subscribe({
      next: (x: any) => (this.platea= JSON.parse(x)),
        error: err => console.error("Observer got an error: " + JSON.stringify(err))
      });    
      for (var k in this.platea["postiNome"]){
        let posto=this.platea["postiNome"][k]['posto'];     
        this.postiPlatea.push(posto);
      }
      }

      receiveNominativo($event) { 
        this.nominativo = $event;        
      }
      
         imposta(posto: string){           
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
         
          

}

