import { ErrorHandler,
         NgModule } from "@angular/core";

import { MaterialsModule } from "@root/shared/materials.module";
import { ShareModule } from "@root/shared/shared.module";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { AppErrorHandler } from "@root/shared/handlers/app-error-handler.module";

import { ConfigService } from "@root/initializer/config.service";
import { HomeService } from "./services/home.service";
import { WelcomeComponent } from "./welcome/welcome.component";

@NgModule({
    imports: [
        DashboardRoutingModule,
        MaterialsModule,
        ShareModule
    ],
    declarations: [
        WelcomeComponent
    ],
    providers: [
        ConfigService,
        HomeService,
        {
            provide: ErrorHandler,
            useClass: AppErrorHandler
        }
    ]
})
export class DashboardModule {}