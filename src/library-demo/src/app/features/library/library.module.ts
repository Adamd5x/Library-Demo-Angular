import { ErrorHandler,
         NgModule } from "@angular/core";

import { ReactiveFormsModule } from "@angular/forms";

import { CoreModule } from '@core/core.module';

import { AppErrorHandler } from "@root/shared/handlers/app-error-handler.module";
import { MaterialsModule } from "@root/shared/materials.module";

import { LibraryRoutingModule } from "./library-routing.module";
import { BookComponent } from "./book/book.component";
import { HomeComponent } from './home/home.component';

import { BookFormComponent } from "@shared/components/book/bookform.component";
import { DigitOnlyDirective } from '@shared/directives/digit-only.directive';

import { LibraryService } from "./services/library.service";
import { CreateBookComponent } from './create-book/create-book.component';
import { AddNewBookStep2Component } from "./create-book/add-new-book-step-2/add-new-book-step-2.component";
import { AddNewBookStep3Component } from "./create-book/add-new-book-step-3/add-new-book-step-3.component";
import { AddNewBookStep1Component } from "./create-book/add-new-book-step-1/add-new-book-step-1.component";

@NgModule({
    imports: [
        CoreModule,
        LibraryRoutingModule,
        ReactiveFormsModule,
        MaterialsModule,
        DigitOnlyDirective
    ],
    declarations: [
        HomeComponent,
        BookComponent,
        BookFormComponent,
        CreateBookComponent,
        AddNewBookStep1Component,
        AddNewBookStep2Component,
        AddNewBookStep3Component
    ],
    providers: [
        LibraryService,
        {
            provide: ErrorHandler,
            useClass: AppErrorHandler
        }
    ]
})
export class LibraryModule{}