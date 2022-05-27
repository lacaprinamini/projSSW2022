
import { Component, VERSION, Input } from '@angular/core';

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
  platea: object;
  palchi: posti;
  color: "";
  
  nominativo: string;
  chiave: string;
  constructor() {
    

  const n = {
    filePlatea: 7,
    postiPlatea: 10,    
    filePalchi: 4,
    postiPalchi: 6
    }
    let nomiPlatea=Object;
    let nomiPalchi=Object;

        this.platea= new posti(n.filePlatea, n.postiPlatea, nomiPlatea);
        console.log( this.platea["postiNome"])

        
        this.palchi= new posti(n.filePalchi, n.postiPalchi, nomiPalchi);
        console.log( this.palchi["postiNome"])
  
        // this.palchi= new posti(teatro.palchi, nomiPalchi);

        // let postiNomi=[{
        //   posto: "",
        //   nome:""
        // }];
        // for(var i=0; i++; i<this.platea.nomi.length){
        //   postiNomi.push({
        //     posto: this.platea.postiDisponibili[i],
        //     nome: this.platea.nomi[i]
        //   })
        // }
       
        
       
        // const postoNomePalchi = [{posto:"", nome:""}];
        // for(var i=0; i<this.palchi.nomi.length; i++){
        //   postoNomePalchi .push({posto:this.palchi.postiDisponibili[i], nome: this.palchi.nomi[i]});
        // }
        // postoNomePalchi.splice(0,1);

        
}
        
        
      

      receiveKey($event) { 
        this.chiave = $event; 
        
      }
      receiveNominativo($event) { 
        this.nominativo = $event; 
      }
      
         imposta(posto: string){   
       console.log("Prenotato a " + this.nominativo +" il posto " + posto);
      console.log(this.chiave)
      // query per inserire nome al posto, set
       
         }
           

}