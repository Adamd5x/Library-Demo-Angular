import { Directive,
         ElementRef,
         EventEmitter,
         HostListener, 
         Output} from '@angular/core';

@Directive({
  selector: 'input[digitOnly]',
  standalone: true
})
export class DigitOnlyDirective {
  @Output()
  valueChanged = new EventEmitter();

  constructor(private elementRef: ElementRef) { }

  @HostListener('input', ['$event'])
  onInputChange(event: KeyboardEvent) {
    const initValue = this.elementRef.nativeElement.value;
    const newValue = initValue.replace(/[^0-9]*/g, '');

    this.elementRef.nativeElement.value = newValue;
    this.valueChanged.emit(newValue);
    if(initValue !== this.elementRef.nativeElement.value) {
      event.stopPropagation();
    }
  }
}
