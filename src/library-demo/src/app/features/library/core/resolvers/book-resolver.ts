import { ResolveFn,
         Router,
         ActivatedRouteSnapshot,
         RouterStateSnapshot
 } from '@angular/router';
import { Book } from "../../models/book";
import { inject } from '@angular/core';

export const BookResolver: ResolveFn<Book> = async (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) => {
        const bookId = route.paramMap.get('id');

        const router = inject(Router);
        

        const result: Book = {
            id: '1',
            title: 'Some title',
            author: 'Some author',
            isbn: 'some isbn',
            state: 'Demaged'
        }
        return result;
    }