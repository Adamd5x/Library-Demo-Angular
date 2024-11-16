import { APP_INITIALIZER, NgModule } from "@angular/core";
import { InitConfigService } from "./init-config.service";
import { take } from "rxjs";


@NgModule({
    providers: [
        {
            provide: APP_INITIALIZER,
            useFactory: (config: InitConfigService) => {
                console.log('Initializing app...');
                config.fetchEndpoints();
                return config.api$
                             .pipe(
                                take(1)
                             )
            },
            deps: [
                InitConfigService
            ]
        }
    ]
})
export class InitializerModule {}