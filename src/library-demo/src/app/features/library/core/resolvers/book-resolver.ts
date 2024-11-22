import { ResolveFn,
         ActivatedRouteSnapshot,
         RouterStateSnapshot
 } from '@angular/router';
import { Book } from "../../models/book";
import { inject } from '@angular/core';
import { LibraryService } from '../../services/library.service';

export const BookResolver: ResolveFn<Book> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) => {
        const bookId = route.paramMap.get('id');        
        return inject(LibraryService).getBook(bookId!);
    }