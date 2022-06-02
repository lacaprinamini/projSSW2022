import { Component, VERSION, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-chiave',
  templateUrl: './chiave.component.html',
  styleUrls: ['./chiave.component.css'],
})
export class ChiaveComponent {
  chiave: string;
  filePlatea: number;
  postiPlatea: number;
  filePalchi: number;
  postiPalchi: number;
  numeriSelezionati: number[];
  @Output() chiaveEvent = new EventEmitter<string>();
  @Output() postiEvent = new EventEmitter<number[]>();

  constructor() {}
  onEnter(value: string) {
    this.chiave = value;
    this.chiaveEvent.emit(this.chiave);
  }
  onSubmit(dimensioni: NgForm) {
    this.filePlatea = dimensioni.value['filePlatea'];
    this.postiPlatea = dimensioni.value['postiPlatea'];
    this.filePalchi = dimensioni.value['filePalchi'];
    this.postiPalchi = dimensioni.value['postiPalchi'];
    this.numeriSelezionati = [
      this.filePlatea,
      this.postiPlatea,
      this.filePalchi,
      this.postiPalchi,
    ];

    this.postiEvent.emit(this.numeriSelezionati);
  }
}
