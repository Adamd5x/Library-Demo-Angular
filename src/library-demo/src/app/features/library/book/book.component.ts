import { Component,
         inject,
         OnInit } from '@angular/core';

import { Book } from '../models/book';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss'
})
export class BookComponent implements OnInit {

  book: Book | null = null;

  form = this.fb.group({
    isbn: [this.book?.isbn, []],
    title: [this.book?.title, []],
    author: [this.book?.author, []],
    state: [this.book?.state, []]
  })

  constructor(public fb: FormBuilder,
              private route: ActivatedRoute){}

  ngOnInit(): void {
    this.book = this.route
                    .snapshot
                    .data['book'];

    this.form.controls['isbn'].setValue(this.book?.isbn);
    this.form.controls['title'].setValue(this.book?.title);
    this.form.controls['author'].setValue(this.book?.author);
    this.form.controls['state'].setValue(this.book?.state);
  }
}
