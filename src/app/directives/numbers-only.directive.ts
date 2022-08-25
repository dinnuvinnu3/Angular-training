import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appNumbersOnly]'
})
export class NumbersOnlyDirective {

  constructor() { }

  @Input() appNumbersOnly!: string | number;
  
  @HostListener('keypress', ['$event'])
    restrictToNumbers(event: KeyboardEvent) {
      const ele = event.target as HTMLInputElement;
      const length = ele.value.length;
      const len=this.appNumbersOnly?Number(this.appNumbersOnly):10;
      if(length >= Number(this.appNumbersOnly) || event.keyCode <48 || event.keyCode>57) {
        event.preventDefault();
      }
  }

}
