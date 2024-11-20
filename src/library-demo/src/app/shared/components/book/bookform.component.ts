import { Component,
         Input,
         OnDestroy } from '@angular/core';
import { ControlValueAccessor,
         FormBuilder,
         Validators,
         NG_VALUE_ACCESSOR, 
         FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'book-form',
  templateUrl: './bookform.component.html',
  styleUrl: './bookform.component.scss',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: BookFormComponent
  }]
})
export class BookFormComponent implements ControlValueAccessor, OnDestroy {

  @Input()
  legend: string = '';

  onTouched = () => {};

  onChangeSubscription: Subscription = new Subscription();

  bookForm: FormGroup = this.fb.group({
    id: [null],
    isbn: [null, [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10)]],
    title: [null, [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(255)]],
    author: [null, [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(255)
    ]],
    state: [null, [
      Validators.required
    ]]
  });

  constructor(private fb: FormBuilder) { }

  ngOnDestroy(): void {
    this.onChangeSubscription
        .unsubscribe();
  }

  writeValue(value: any): void {
    if (value) {
      this.bookForm.setValue(value);
    }
  }

  registerOnChange(onChange: any): void {
    this.onChangeSubscription = this.bookForm
                                    .valueChanges
                                    .subscribe(onChange)  ;
  }
  registerOnTouched(onTouched: any): void {
    this.onTouched = onTouched
  }

  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.bookForm.disable();
    } else {
      this.bookForm.enable();
    }
  }
}
