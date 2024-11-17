import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Book } from '../models/book';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements AfterViewInit, OnInit {

  displayColumns: string[] = ['title','isbn','author','state', 'action'];
  dataSource = new MatTableDataSource<Book>();

  @ViewChild(MatSort)
  sort: MatSort = new MatSort();

  // @ViewChild(MatPaginator)
  // paginator: MatPaginator = new MatPaginator();

  constructor(){}


  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    //this.dataSource.paginator = this.paginator;
  }

  bookSortChange(sortState: Sort) {
    if (sortState.direction) {

    } else {

    }
  }
}
