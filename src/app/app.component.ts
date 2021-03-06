import { Component, VERSION, Input } from '@angular/core';
import { kvaasService } from './teatro.service';

class posti {
  nfile: number;
  nposti: number;
  postiNome: string[];
  postiDisponibili: string[];
  constructor(
    nfile: number,
    nposti: number,
    postiNome: object,
    postiDisponibili: string[]
  ) {
    
    let posti = Array(Number(nfile)).fill('').map(() => Array(Number(nposti)).fill('x'));
    const postoNome = [];
    const postiLiberi = [];
    posti.map((fila, i) => {
      fila.map((nome, j) => {
        const posto = 'P' + (j + 1) + (i + 1);

        postoNome.push(nome);
        postiLiberi.push(posto);
      });
    });
    this.postiNome = postoNome;
    this.postiDisponibili = postiLiberi;
  }
}
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  postiScelti: number[];
  platea: posti;
  palchi: posti;
  postiPlatea: string[] = [];
  postiPalchi: string[] = [];
  nominativo: string;
  chiave: any;
  postiOccupati: any[] = [];
  numeroPostiPrenotatiPlatea: string[] = [];
  numeroPostiPrenotatiPalchi: string[] = [];
  error: any;
  constructor(private query: kvaasService) {
    this.error = '0';
  }

  receivePosti($event) {
    this.postiScelti = $event;
    let nomiPlatea = [];
    let nomiPalchi = [];
    let postiDisponibiliPalchi = [];
    let postiDisponibiliPlatea = [];
    this.platea = new posti(
      this.postiScelti[0],
      this.postiScelti[1],
      nomiPlatea,
      postiDisponibiliPlatea
    );
    //console.log(this.platea)
    this.palchi = new posti(
      this.postiScelti[2],
      this.postiScelti[3],
      nomiPalchi,
      postiDisponibiliPalchi
    );
    this.query.newData().subscribe({
      next: (x: any) => (this.chiave=x),
      error: (err) =>
        console.error('Observer got an error: ' + JSON.stringify(err)),
    });
  }
  receiveKey($event) {
    this.chiave = $event;
    let nomiPlatea = [];
    let nomiPalchi = [];
    let postiDisponibiliPalchi = [];
    let postiDisponibiliPlatea = [];
    this.platea = new posti(7, 10, nomiPlatea, postiDisponibiliPlatea);
    this.palchi = new posti(4, 6, nomiPalchi, postiDisponibiliPalchi);
    this.postiOccupati = [{ x: '', nome: 'x' }];
    this.query.getData(this.chiave).subscribe({
      next: (x: any) => (this.postiOccupati = JSON.parse(x)),
      error: (err) =>
        console.error('Observer got an error: ' + JSON.stringify(err)),
    });
  }

  receiveNominativo($event) {
    this.nominativo = $event;
    for (let presente in this.postiOccupati) {
      if (this.postiOccupati[presente]['nome'] === this.nominativo) {
        this.nominativo = undefined;
        this.error = 'Il nome ?? gi?? presente';
      }
    }
    if (this.nominativo !== undefined) {
      if (this.postiOccupati !== null) {
        for (let pl in this.postiOccupati) {
          if (this.postiOccupati[pl]['platea'] != undefined) {
            this.numeroPostiPrenotatiPlatea.push(
              this.postiOccupati[pl]['platea']
            );
          }
        }
        for (let pa in this.postiOccupati) {
          if (this.postiOccupati[pa]['palco'] != undefined) {
            this.numeroPostiPrenotatiPalchi.push(
              this.postiOccupati[pa]['palco']

              
            );
          }
        }
        this.error = '';
      }
    }
  }

  imposta(posto: string, posizione: string) {
    if(this.postiOccupati===null){
      this.postiOccupati=[{"":"", nome: ""}];
    }
    var verificaPostoPlatea = true;
    for (let c in this.postiOccupati) {
      if (this.postiOccupati[c]['platea'] === posto) {
        verificaPostoPlatea = false;
        break;
      }
    }
    var verificaPostoPalchi = true;
    for (let c in this.postiOccupati) {
      if (this.postiOccupati[c]['palco'] === posto) {
        verificaPostoPalchi = false;
        break;
      }
    }
    if (posizione === 'platea') {
      if (verificaPostoPlatea) {
        this.postiOccupati.push({ platea: posto, nome: this.nominativo });
        this.query.setData(this.postiOccupati, this.chiave).subscribe({
          next: (x: any) => console.log(x),
          error: (err) =>
            console.error('Observer got an error: ' + JSON.stringify(err)),
        });
        this.error = 'Prenotato a ' + this.nominativo + ' il posto ' + posto;
        this.nominativo = undefined;
      }
    }
    if (posizione === 'palco') {
      if (verificaPostoPalchi) {
        this.postiOccupati.push({ palco: posto, nome: this.nominativo });
        this.query.setData(this.postiOccupati, this.chiave).subscribe({
          next: (x: any) => console.log(x),
          error: (err) =>
            console.error('Observer got an error: ' + JSON.stringify(err)),
        });
        this.nominativo = undefined;
      }
    }
  }
}
