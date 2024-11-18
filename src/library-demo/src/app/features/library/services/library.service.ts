import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map,
         Observable } from 'rxjs';

import { DataService } from '@root/shared/base/data.service';
import { Endpoints } from '@root/shared/functions/endpoints';
import { Book } from '../models/book';
import { ApiResponse } from '@root/shared/models/api-response';
import { BookState } from '../models/book-state';
import { SortOrder } from '@root/shared/types/sort-order';

@Injectable()
export class LibraryService extends DataService {
  private endpoints = Endpoints();
  private url = this.endpoints.endpoints.Library;
  constructor(http: HttpClient) {
    super(http);
   }

   getBooks(sortBy: string = "Title",
            sortOrder: SortOrder = 'Ascending',
            offset: number = 0,
            size: number = 10
   ): Observable<Book[]> {
    return this.get<ApiResponse<Book[]>>(`${this.url}`, 
               new HttpHeaders(),
               new HttpParams()
                  .set('sortBy', sortBy)
                  .set('sortOrder', sortOrder)
                  .set('offset', offset)
                  .set('size', size)
               )
               .pipe(
                  map(x => x.data as Book[])
               )
   }

   getBook(id: string): Observable<Book> {
    return this.get<ApiResponse<Book>>(`${this.url}/id`)
               .pipe(
                map(x => x.data as Book)
               )
   }

   deleteBook(id: string): Observable<void> {
      return this.delete(`${this.url}/${id}`);
   }

   insertBook(entity: Book): Observable<Book> {
      return this.post<Book>(`${this.url}`, entity);
   }

   updateBook(id: string, entity: Book): Observable<Book> {
      return this.update<Book>(`${this.url}/${id}`, entity)
                 .pipe(
                   map(x => x.data)
                 );

   }

   changeState(id: string, state: BookState): Observable<void> {
      return this.update<ApiResponse<boolean>>(`${this.url}/${id}/${state}`)
                 .pipe(
                     map(x => x.data)
                 );
   }

   checkIsbn(isbn: string): Observable<boolean | null | undefined> {
      return this.get<ApiResponse<boolean>>(`${this.url}/isbn/${isbn}`)
                 .pipe(
                  map(x => x.data)
                 );
   }
}
