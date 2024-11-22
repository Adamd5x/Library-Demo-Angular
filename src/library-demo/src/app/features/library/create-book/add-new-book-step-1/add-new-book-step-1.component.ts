import { Component } from '@angular/core';
import { NonNullableFormBuilder, Validators, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'add-new-book-step-1',
  templateUrl: './add-new-book-step-1.component.html',
  styleUrl: './add-new-book-step-1.component.scss',
})

export class AddNewBookStep1Component {

  form = this.fb.group({
    book: [null, [Validators.required]]
  })

  constructor(private fb: NonNullableFormBuilder){}
}
