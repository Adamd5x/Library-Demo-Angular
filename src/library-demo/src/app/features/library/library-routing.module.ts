import { NgModule } from "@angular/core";
import { RouterModule,
         Routes } from "@angular/router";

import { HomeComponent } from "./home/home.component";
import { BookComponent } from "./book/book.component";
import { BookResolver } from "./core/resolvers/book-resolver";

const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: ':id',
        component: BookComponent,
        resolve: { book: BookResolver }
    }
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