
import { Component, VERSION, Input } from '@angular/core';
import { kvaasService } from "./teatro.service";

class posti {
  nfile: number;
  nposti: number;
  postiNome: string[];
  postiDisponibili: string[]
  constructor(nfile: number,
    nposti: number, postiNome: object, postiDisponibili: string[]) {
      let posti= Array(nfile).fill("").map(() => Array(nposti).fill("x"));
    const postoNome = [];
    const postiLiberi=[];
    posti.map((fila, i) => {
        fila.map((nome, j) => { 
          const posto= 'P'+(j+1)+(i+1); 
          postoNome .push(nome);
         postiLiberi.push(posto);
      });     
    });      
    this.postiNome= postoNome;
    this.postiDisponibili=postiLiberi;
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
        let nomiPlatea=[];
        let nomiPalchi=[];
        let postiDisponibiliPalchi=[];
        let postiDisponibiliPlatea=[];
        this.platea= new posti(7, 10, nomiPlatea, postiDisponibiliPlatea);
        
        //this.palchi=new posti(4, 6, nomiPalchi);
     
        this.query.getData(this.chiave).subscribe({
      next: (x: any) => (this.platea.postiNome= JSON.parse(x)),
        error: err => console.error("Observer got an error: " + JSON.stringify(err))
      });  
      }

      receiveNominativo($event) { 
        this.nominativo = $event;        
      }
      
         imposta(posto: string){  
                  
      for (var k in this.platea.postiDisponibili){
        if(this.platea.postiDisponibili[k]==posto){
          this.platea.postiNome[k]=this.nominativo;
          
        }
      }
      this.query.setData(this.platea.postiNome).subscribe({
        next: (x: any) => (console.log(x)),
        error: err => console.error("Observer got an error: " + JSON.stringify(err))
        });        
      this.nominativo=undefined;      
         }
         
          

}

