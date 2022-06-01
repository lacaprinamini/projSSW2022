
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
  chiave: string;
  postiOccupati: any[]=[];
  numeroPostiPrenotatiPlatea: string[]=[];
  numeroPostiPrenotatiPalchi: string[]=[];
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
      if(this.postiOccupati!==null){
      this.postiOccupati=[{"": "", nome: ""}] 
      }
      }

      receiveNominativo($event) { 
        this.nominativo = $event;
if(this.postiOccupati!==null){
   for(let pl in this.postiOccupati){
    if(this.postiOccupati[pl]['platea']!=undefined){
      this.numeroPostiPrenotatiPlatea.push(this.postiOccupati[pl]['platea'])
    }
   }
   for(let pa in this.postiOccupati){
    if(this.postiOccupati[pa]['palchi']!=undefined){
      this.numeroPostiPrenotatiPalchi.push(this.postiOccupati[pa]['platea'])
    }
   }
      
    }
  }
         imposta(posto: string, posizione: string){ 
          this.postiOccupati=[{"": "", nome: ""}]   
        if(posizione==="platea"){
          this.postiOccupati.push({"platea": posto, nome: this.nominativo})
        }
        else{
          this.postiOccupati.push({"palchi": posto, nome: this.nominativo})
          
        }
    
      this.query.setData(this.postiOccupati).subscribe({
        next: (x: any) => (console.log(x)),
        error: err => console.error("Observer got an error: " + JSON.stringify(err))
        });        
      this.nominativo=undefined;      
         }
          

}

