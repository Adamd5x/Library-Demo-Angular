import { Component,
         inject,
         OnInit } from '@angular/core';

import { Book } from '../models/book';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder,
         Validators } from '@angular/forms';
import { LibraryService } from '../services/library.service';
import { IsbnValidator } from '../core/validators/isbn-validator';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss'
})
export class BookComponent implements OnInit {

  book: Book | null = null;

  legend = '';

  form = this.fb.group({
    'bookDetails': [this.book]
  })

  constructor(public fb: FormBuilder,
              private route: ActivatedRoute,
              private libraryService: LibraryService){}

  ngOnInit(): void {
    this.book = this.route
                    .snapshot
                    .data['book'];

    if (this.book?.id !== '') {
      this.legend = `Edit: ${this.book?.title}`;
    } else {
      'Create'
    }
    

    // this.form
    //     .controls['bookDetails']
    //     .addAsyncValidators(IsbnValidator(this.libraryService));

    this.form
        .controls['bookDetails']
        .setValue(this.book);
  }

  onSave(): void {
    if (this.form.valid) {
      const bookValue = this.form.value;

      if (bookValue.bookDetails && bookValue.bookDetails.id !== '') {
        this.libraryService
            .updateBook(bookValue.bookDetails.id, bookValue.bookDetails)
            .subscribe();
      } else if (bookValue.bookDetails) {
        this.libraryService.insertBook(bookValue.bookDetails).subscribe()
      }
    }
  }
}
