import { BookState } from "./book-state";

export interface Book {
    id: string;
    isbn: string;
    title: string;
    author: string;
    state: BookState;
}