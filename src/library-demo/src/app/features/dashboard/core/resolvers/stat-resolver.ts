import { ActivatedRouteSnapshot,
         ResolveFn,
         RouterStateSnapshot } from "@angular/router";
import { LibraryStatistics } from "../../models/stat-model";
import { HomeService } from "../../services/home.service";
import { inject } from "@angular/core";

export const HomeResolver: ResolveFn<LibraryStatistics | null | undefined> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    return inject(HomeService).getLibraryStat();
}