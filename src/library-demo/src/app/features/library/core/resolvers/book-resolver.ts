import { ResolveFn,
         ActivatedRouteSnapshot,
         RouterStateSnapshot
 } from '@angular/router';
import { Book } from "../../models/book";
import { inject } from '@angular/core';
import { LibraryService } from '../../services/library.service';
import { first, of } from 'rxjs';

export const BookResolver: ResolveFn<Book> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) => {
        const bookId = route.paramMap.get('id');
        if (bookId && +bookId > 0) {
            return inject(LibraryService).getBook(bookId)
                                        .pipe(
                                            first()
                                        );
        }
        const emptyBook: Book =  {
            id: '',
            isbn: '',
            title: '',
            author: '',
            state: 'Uknown'
        };
        
        return emptyBook;
    }