import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ConfigResponse } from "@root/shared/models/config-response";
import { BehaviorSubject, filter } from "rxjs";
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class InitConfigService {
    private readonly initDataRepoKey = "Config";
    private configResponse = new BehaviorSubject<ConfigResponse | null>(null);
    readonly api$ = this.configResponse
                        .asObservable()
                        .pipe(
                            filter(endpoints => !!endpoints)
                        );

    get endpoints(): ConfigResponse | null {
        return null;
    }

    constructor(private http: HttpClient){}

    fetchEndpoints(): void {
        const baseApi = environment.apiurl;

        this.http
            .get<ConfigResponse>(`${baseApi}/api/config`)
            .subscribe({
                next: (response) => {
                    this.configResponse.next(response);
                }
            })
    }
    
}