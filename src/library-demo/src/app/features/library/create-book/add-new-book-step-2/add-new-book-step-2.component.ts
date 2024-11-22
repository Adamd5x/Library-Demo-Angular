import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'add-new-book-step-2',
  templateUrl: './add-new-book-step-2.component.html',
  styleUrl: './add-new-book-step-2.component.scss'
})
export class AddNewBookStep2Component implements OnInit {

  form = this.fb.group({
    coverType: ['soft', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(10)]],
    mediumType: ['print', [
      Validators.required
    ]]
  });

  constructor(private fb: NonNullableFormBuilder) {}

  ngOnInit(): void {
    this.form
        .valueChanges
        .subscribe(val => {
          const coverTypeControl = this.form.controls['coverType'];

          if (val.mediumType == 'digital' && coverTypeControl.enabled) {
            coverTypeControl.disable({emitEvent: false});
            coverTypeControl.setValue('none');

          } else if (val.mediumType == 'print' && coverTypeControl.disabled){
            coverTypeControl.enable({emitEvent: false});
          }
        });
  }
}
