import { Component,
         inject,
         OnInit } from '@angular/core';

import { Book } from '../models/book';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss'
})
export class BookComponent implements OnInit {

  book: Book | null = null;

  private activatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.activatedRoute
        .data
        .subscribe(({data}) => this.book = data);
  }
}
