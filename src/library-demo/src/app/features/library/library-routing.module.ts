import { NgModule } from "@angular/core";
import { RouterModule,
         Routes } from "@angular/router";

import { HomeComponent } from "./home/home.component";
import { BookComponent } from "./book/book.component";
import { BookResolver } from "./core/resolvers/book-resolver";
import { CreateBookComponent } from "./create-book/create-book.component";


const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },    
    {
        path: 'book/:id',
        component: BookComponent,
        resolve: { book: BookResolver }
    },
    {
        path: 'new',
        component: CreateBookComponent
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class LibraryRoutingModule {}