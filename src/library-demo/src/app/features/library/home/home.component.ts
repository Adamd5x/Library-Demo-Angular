import { AfterViewInit,
         Component,
         OnInit,
         ViewChild } from '@angular/core';
import { tap,
         catchError,
         throwError, 
         finalize} from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { Book } from '../models/book';
import { MatSort,
         Sort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { LibraryService } from '../services/library.service';
import { ActivatedRoute } from '@angular/router';
import { ApplicationError } from '@shared/models/application-error';
import { SortOrder } from '@root/shared/types/sort-order';
import { StateService } from '@root/shared/services/state.service';



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
  sort!: MatSort;

  @ViewChild(MatPaginator, {static: false})
  paginator!: MatPaginator;

  dataSource = new MatTableDataSource<any>();

  totalItems = 100;
  pageIndex = 0;
  pageSize = 10;
  sortBy = "Title";
  sortOrder: SortOrder = 'asc';

  constructor(private route: ActivatedRoute,
              private libraryService: LibraryService,
              private stateService: StateService){}

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort; 
    this.totalItems = this.stateService.getValue();
    this.getItems();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

 onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getItems();
 }

getItems(): void {
  const offset = this.pageSize * (this.pageIndex);
  this.libraryService
  .getBooks(
    this.sortBy,
    this.sortOrder,
    offset,
    this.pageSize
  )
  .pipe(
    tap(x => {
      this.books = x;
      this.dataSource.data = x as Book[];
    }),
    catchError((err) => {
      console.log("Error loading list", err);
      return throwError(() => new ApplicationError(err));
    }),
    finalize(() => this.loading = false)
  )
  .subscribe();
}

  bookSortChange(sortState: Sort) {
    this.sortBy = sortState.active;
    this.sortOrder = sortState.direction as SortOrder;
    this.getItems();
  }
}
