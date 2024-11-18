import { CommonModule } from '@angular/common';
import { NgModule, ErrorHandler } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppErrorHandler } from './handlers/app-error-handler.module';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCommonModule } from '@angular/material/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { StateService } from './services/state.service';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatIconModule,
        MatButtonModule,
        MatCommonModule,
        MatProgressBarModule
    ],
    exports: [],
    providers: [
        StateService,
        {
            provide: ErrorHandler,
            useClass: AppErrorHandler
        }]
})
export class ShareModule {}