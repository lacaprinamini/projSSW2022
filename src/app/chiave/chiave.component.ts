import { Component, VERSION, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-chiave',
  templateUrl: './chiave.component.html',
  styleUrls: ['./chiave.component.css']
})
export class ChiaveComponent  {
  chiave: string;
  @Output() chiaveEvent = new EventEmitter<string>();
  constructor(){}
  onEnter(value: string) {
    this.chiave=value;
    this.chiaveEvent.emit(this.chiave);
  }
 
  }