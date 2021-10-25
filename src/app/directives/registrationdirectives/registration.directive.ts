import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appRegistration]',
})
export class RegistrationDirective {
  constructor(private el: ElementRef) {}

  @HostListener('keypress') change() {
    let value: string = this.el.nativeElement.value;
    let final;
    // console.log(value.length);
    switch (value.length) {
      case 0:
        this.el.nativeElement.value = '+91-' + this.el.nativeElement.value;
        break;
      case 9:
        final = this.el.nativeElement.value;
        this.el.nativeElement.value = this.el.nativeElement.value + '-';
    }
  }
}
