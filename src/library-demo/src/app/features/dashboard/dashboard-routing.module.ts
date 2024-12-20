import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { WelcomeComponent } from "./welcome/welcome.component";
import { HomeResolver } from "./core/resolvers/stat-resolver";


const routes: Routes = [
    {
        path: '',
        component: WelcomeComponent,
        resolve: { data: HomeResolver }
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class DashboardRoutingModule {}