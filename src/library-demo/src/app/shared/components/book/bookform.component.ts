import { Component,
         OnDestroy, 
         OnInit} from '@angular/core';
import { ControlValueAccessor,
         Validators,
         NG_VALUE_ACCESSOR, 
         NonNullableFormBuilder } from '@angular/forms';
import { BookStateValidator } from '@root/shared/validators/book-state-validator';
import { filter,
         Subscription } from 'rxjs';



@Component({
  selector: 'book-form',
  templateUrl: './bookform.component.html',
  styleUrl: './bookform.component.scss',
  providers: [
  {
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: BookFormComponent
  }]
})
export class BookFormComponent implements ControlValueAccessor, OnInit, OnDestroy {

  onTouched = () => {};

  onValidatorChanged = () => {};

  onChangeSubscription: Subscription | null = null;

  form = this.fb.group({
    id: [''],
    isbn: ['', {
      validators: [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(13),
        Validators.pattern('[0-9]*')
      ]}],
    title: ['', {
      validators: [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(255)
    ]}],
    author: ['', {
      validators: [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(255)
    ]}],
    state: ['', {
      validators: [
        Validators.required,
        BookStateValidator()
    ]}]
  });

  constructor(private fb: NonNullableFormBuilder) { }

  ngOnInit(): void {
        const draft = sessionStorage.getItem('STEP_1');

        if (draft) {
          this.form.setValue(JSON.parse(draft));
        }

        this.form
            .valueChanges
            .pipe(
              filter(() => this.form.valid))
            .subscribe(val => sessionStorage.setItem('STEP_1', JSON.stringify(this.form.value)));
  }

  ngOnDestroy(): void {
    this.onChangeSubscription?.unsubscribe();
  }

  writeValue(value: any): void {
    if (value) {
      this.form.setValue(value);
    }
  }

  registerOnChange(onChange: any): void {
    this.onChangeSubscription = this.form
                                    .valueChanges
                                    .subscribe(onChange)  ;
  }
  registerOnTouched(onTouched: any): void {
    this.onChangeSubscription = this.form
                                    .valueChanges
                                    .subscribe(onTouched);
  }

  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }
}
