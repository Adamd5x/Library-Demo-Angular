import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { EMPTY,
         Observable,
         tap,
         catchError,
         throwError, 
         finalize} from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { Book } from '../models/book';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { LibraryService } from '../services/library.service';
import { ActivatedRoute } from '@angular/router';
import { ApplicationError } from '@shared/models/application-error';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements AfterViewInit, OnInit {

  loading = false;
  books: Book[] = [];
  displayedColumns: string[] = ['title','isbn','author','state'];
  
  @ViewChild(MatSort, {static: false})
  sort: MatSort = new MatSort();

  // @ViewChild(MatPaginator, {static: false})
  // paginator: MatPaginator;


  dataSource: MatTableDataSource<Book[], MatPaginator> = new MatTableDataSource();

  constructor(private route: ActivatedRoute,
              private libraryService: LibraryService){}

  ngOnInit(): void {
    this.libraryService
        .getBooks()
        .pipe(
          tap(x => {
            this.books = x;
          }),
          catchError((err) => {
            console.log("Error loading list", err);
            return throwError(() => new ApplicationError(err));
          }),
          finalize(() => this.loading = false)
        )
        .subscribe();
  }

  ngAfterViewInit(): void {
    // this.paginator
    //     .page
    //     .pipe()
    //     .subscribe()
  }

  bookSortChange(sortState: Sort) {
    if (sortState.direction) {

    } else {

    }
  }
}
