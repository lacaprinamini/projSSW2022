
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
  postiOccupatiPlatea: any;
  postiOccupatiPalchi: any;
 
  constructor(private query: kvaasService) {}
      receiveKey($event) { 
        this.chiave = $event; 
        let nomiPlatea=[];
        let nomiPalchi=[];
        let postiDisponibiliPalchi=[];
        let postiDisponibiliPlatea=[];
        this.platea= new posti(7, 10, nomiPlatea, postiDisponibiliPlatea);
        this.palchi=new posti(4, 6, nomiPalchi, postiDisponibiliPalchi);
        this.postiOccupatiPlatea=[{platea: "", nome: ""}]
        this.postiOccupatiPlatea=[{palchi: "", nome: ""}]
        this.query.getData(this.chiave).subscribe({
      next: (x: any) => (console.log(JSON.parse(x))),
        error: err => console.error("Observer got an error: " + JSON.stringify(err))
      });  
      }

      receiveNominativo($event) { 
        this.nominativo = $event;        
      }
      
         impostaPlatea(posto: string){                  
    this.postiOccupatiPlatea.push({posto: posto, nome: this.nominativo})
    this.postiOccupatiPlatea.splice(0, 1);
      this.query.setData(this.postiOccupatiPlatea, this.postiOccupatiPalchi).subscribe({
        next: (x: any) => (console.log(x)),
        error: err => console.error("Observer got an error: " + JSON.stringify(err))
        });        
      this.nominativo=undefined;      
         }
         
         impostaPalchi(posto: string){                  
          this.postiOccupatiPalchi.push({posto: posto})
          this.postiOccupatiPalchi.splice(0, 1);
          this.query.setData(this.postiOccupatiPlatea, this.postiOccupatiPalchi).subscribe({
            next: (x: any) => (console.log(x)),
            error: err => console.error("Observer got an error: " + JSON.stringify(err))
            });        
          this.nominativo=undefined;      
             }
          

}

