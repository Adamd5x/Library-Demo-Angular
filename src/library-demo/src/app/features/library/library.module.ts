import { ErrorHandler,
          NgModule } from "@angular/core";

import { AppErrorHandler } from "@root/shared/handlers/app-error-handler.module";
import { LibraryRoutingModule } from "./library-routing.module";
import { MaterialsModule } from "@root/shared/materials.module";
import { BookComponent } from "./book/book.component";
import { HomeComponent } from './home/home.component';
import { LibraryService } from "./services/library.service";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
    imports: [
        LibraryRoutingModule,
        ReactiveFormsModule,
        MaterialsModule
    ],
    declarations: [
        HomeComponent,
        BookComponent
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