import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'add-new-book-step-3',
  templateUrl: './add-new-book-step-3.component.html',
  styleUrl: './add-new-book-step-3.component.scss'
})
export class AddNewBookStep3Component implements OnInit {

  form = this.fb.group({
    longDescription: ['', [Validators.maxLength(500)]]
  })

  constructor(private fb : NonNullableFormBuilder){}

  ngOnInit(): void {
    
  }

}
