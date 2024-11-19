import { ErrorHandler,
         NgModule } from "@angular/core";

import { ReactiveFormsModule } from "@angular/forms";

import { CoreModule } from '@core/core.module';

import { AppErrorHandler } from "@root/shared/handlers/app-error-handler.module";
import { MaterialsModule } from "@root/shared/materials.module";

import { LibraryRoutingModule } from "./library-routing.module";
import { BookComponent } from "./book/book.component";
import { HomeComponent } from './home/home.component';

import { BookFormComponent } from "@root/shared/components/book/bookform.component";

import { LibraryService } from "./services/library.service";

@NgModule({
    imports: [
        CoreModule,
        LibraryRoutingModule,
        ReactiveFormsModule,
        MaterialsModule
    ],
    declarations: [
        HomeComponent,
        BookComponent,
        BookFormComponent
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