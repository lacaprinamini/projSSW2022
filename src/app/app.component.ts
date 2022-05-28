
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
  chiave: string;
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
        let res="";
        this.query
      .getData()
      .subscribe({
        next: (x: any) => (console.log(x)),
        error: err => console.error("Observer got an error: " + JSON.stringify(err))
      });
      console.log(res)
        
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
      
      this.nominativo=undefined;
      // query per inserire nome al posto, set
       
         }
           

}