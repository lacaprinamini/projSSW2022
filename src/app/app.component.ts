
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
  nominativo: string;
  chiave: string;
  postiOccupati: any[]=[];
  numeroPostiPrenotatiPlatea: string[]=[];
  numeroPostiPrenotatiPalchi: string[]=[];
  error:string;
  constructor(private query: kvaasService) {
    this.error="0";
  }

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
        
        for(let presente in this.postiOccupati){
          if(this.postiOccupati[presente]['nome']===this.nominativo){
            this.nominativo=undefined;
            this.error="Il nome è già presente"
          }
         }

if(this.nominativo!==undefined){
if(this.postiOccupati!==null){
   for(let pl in this.postiOccupati){
    if(this.postiOccupati[pl]['platea']!=undefined){
      this.numeroPostiPrenotatiPlatea.push(this.postiOccupati[pl]['platea'])
    }
   }
   for(let pa in this.postiOccupati){
    if(this.postiOccupati[pa]['palchi']!=undefined){
      this.numeroPostiPrenotatiPalchi.push(this.postiOccupati[pa]['palchi'])
    }
   }
   
     this.error="" ;
    }
  }
  }
         imposta(posto: string, posizione: string){ 
          if(this.postiOccupati===null){
            this.postiOccupati=[{"": "", nome: ""}]            
            }
            var verificaPostoPlatea=true;          
            for(let c in this.postiOccupati){
              if(this.postiOccupati[c]['platea']===posto ){              
                 verificaPostoPlatea=false;
                break;
              }
             }
             var verificaPostoPalchi=true;          
            for(let c in this.postiOccupati){
              if(this.postiOccupati[c]['palchi']===posto ){              
                 verificaPostoPalchi=false;
                break;
              }
             }
             console.log(verificaPostoPalchi, verificaPostoPlatea)
      if(posizione==="platea"){
           if(verificaPostoPlatea){
          this.postiOccupati.push({"platea": posto, nome: this.nominativo})
        
        this.query.setData(this.postiOccupati).subscribe({
          next: (x: any) => (console.log(x)),
          error: err => console.error("Observer got an error: " + JSON.stringify(err))
          });        
        this.nominativo=undefined; 
      }   
    }
    if(posizione==="palco"){
      if(verificaPostoPalchi){
        
     this.postiOccupati.push({"palco": posto, nome: this.nominativo})
   
   this.query.setData(this.postiOccupati).subscribe({
     next: (x: any) => (console.log(x)),
     error: err => console.error("Observer got an error: " + JSON.stringify(err))
     });        
   this.nominativo=undefined; 
 }   
}
      }
}

