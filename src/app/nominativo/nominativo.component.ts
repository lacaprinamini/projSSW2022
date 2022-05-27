import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-nominativo',
  templateUrl: './nominativo.component.html',
  styleUrls: ['./nominativo.component.css']
})
export class NominativoComponent {
  @Input() chiave: string;
  nominativo: string;
  dati: string[];
  @Output() nominativoEvent = new EventEmitter<string>();
  constructor() { }
 
  onEnter(value: string) {
    this.nominativo=value;
    this.nominativoEvent.emit(this.nominativo);

  }

}