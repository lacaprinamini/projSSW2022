import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appColor]'
})
export class colorDirective {
  constructor(private el: ElementRef) { }
  @Input() defaultColor = '';
  
  @Input() appColor= '';
  
  @HostListener('click') onClick() {
    this.highlight(this.appColor || this.defaultColor || 'red');
  }
  private highlight(color: string) {
    this.el.nativeElement.style.color = color;
  }
}

