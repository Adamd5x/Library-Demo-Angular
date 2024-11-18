import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {BehaviorSubject, filter, firstValueFrom } from "rxjs";

import { ApiResponse } from "@shared/models/api-response";
import { ConfigResponse } from "@shared/models/config-response";
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})
export class ConfigService {
    constructor(private http: HttpClient){}

    loadConfig(): Promise<void> {
        const baseApi = environment.apiUrl;
        return firstValueFrom(this.http.get<ApiResponse<ConfigResponse>>(`${baseApi}/api/config`)).then((data) => {
            const response = data;
            const endpoints = response.data as ConfigResponse;
            sessionStorage.setItem("endpoints", JSON.stringify(endpoints));
        });
    }

    get Endpoints() : ConfigResponse | null {
        const rawConfig = sessionStorage.getItem("endpoints");
        const endpoints = this.fromJson(rawConfig);
        return endpoints;
    }

    fromJson(json?: string | null): ConfigResponse {
        if (json) {
          const data: ConfigResponse = JSON.parse(json);
          return data;
        }
        return {
            endpoints: {
                Statistics: '',
                Library: ''
            }
        }
    }
}