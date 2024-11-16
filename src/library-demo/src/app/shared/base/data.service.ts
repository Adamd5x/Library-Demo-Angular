import { Injectable } from "@angular/core";

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { catchError, Observable, throwError } from "rxjs";
import { NotFoundError } from "../models/not-found-error";
import { BadInputError } from "../models/bad-input-error";
import { ApplicationError } from "../models/application-error";

const BadRequestCode = 400;
const NotFoundCode = 404;

@Injectable()
export class DataService{
 
  apiUrl: string = environment.apiurl;

  constructor(private http: HttpClient) {}

public get<TModel>(entryUrl: string,
                   headers?: HttpHeaders | {[header: string]: string | string[]},
                   params?: HttpParams | {[params: string]: string | number | boolean | ReadonlyArray<string | number | boolean>},
                   withCredentials?: boolean): Observable<TModel> {
    const url = `{this.apiUrl}/${entryUrl}`;

    return this.http.get<TModel>(
        url,
        {
            headers: headers,
            params: params,
            withCredentials: withCredentials
        }).pipe(
        catchError(this.handleError));
}

public post<TModel>(entryUrl: string,
    entry: TModel,
    headers?: HttpHeaders | {[header: string]: string | string[]},
    params?: HttpParams|{[param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>},
    withCredentials?: boolean): Observable<TModel> {
    const url = `${this.apiUrl}/${entryUrl}`;

    return this.http.post<TModel>(url,
                                entry,
                                {
                                headers: headers,
                                params: params,
                                withCredentials: withCredentials
                                }).pipe(
                                    catchError(this.handleError));
}

public update<TModel>(entryUrl: string, entry: Partial<TModel>, 
    headers?: HttpHeaders | {[header: string]: string | string[]},
    params?: HttpParams|{[param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>},
    withCredentials?: boolean): Observable<any> {
const url = `${this.apiUrl}/${entryUrl}`;

return this.http.put(url, entry, {
                    headers: headers,
                    params: params,
                    withCredentials: withCredentials
                    }).pipe(
                        catchError(this.handleError));
}


public delete(entryUrl: string,
 headers?: HttpHeaders | {[header: string]: string | string[]},
 params?: HttpParams|{[param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>}): Observable<any> {

  const url = `${this.apiUrl}/${entryUrl}`;

    return this.http.delete(url, {
                            headers: headers,
                            params: params
                            }).pipe(
                                catchError(this.handleError));
}

  private handleError(error: Response): Observable<never> {
    if (error.status === NotFoundCode) {
        return throwError(() => new NotFoundError());
    }

    if (error.status === BadRequestCode ) {
        return throwError(() => new BadInputError());
    }

    return throwError(() => new ApplicationError());
  }
}