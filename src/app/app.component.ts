
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
  postiOccupati: any;

  constructor(private query: kvaasService) {}

      receiveKey($event) { 
        this.chiave = $event; 
        let nomiPlatea=[];
        let nomiPalchi=[];
        let postiDisponibiliPalchi=[];
        let postiDisponibiliPlatea=[];

        this.platea= new posti(7, 10, nomiPlatea, postiDisponibiliPlatea);
        this.palchi=new posti(4, 6, nomiPalchi, postiDisponibiliPalchi);
        
        this.postiOccupati=[{"": "", nome: ""}]   
        
        this.query.getData(this.chiave).subscribe({
      next: (x: any) => (this.postiOccupati=JSON.parse(x)),
        error: err => console.error("Observer got an error: " + JSON.stringify(err))
      });  
     
      }

      receiveNominativo($event) { 
        this.nominativo = $event;

       
    }
      
         imposta(posto: string, posizione: string){ 
           
        if(posizione==="platea"){
          this.postiOccupati.push({"platea": posto, nome: this.nominativo})
        }
        else{
          this.postiOccupati.push({"palchi": posto, nome: this.nominativo})
          console.log(this.postiOccupati)
        }
    
      this.query.setData(this.postiOccupati).subscribe({
        next: (x: any) => (console.log(x)),
        error: err => console.error("Observer got an error: " + JSON.stringify(err))
        });        
      this.nominativo=undefined;      
         }
          

}

