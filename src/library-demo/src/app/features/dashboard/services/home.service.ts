import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from '@root/shared/base/data.service';
import { map, Observable } from 'rxjs';
import { LibraryStatistics } from '../models/stat-model';
import { ApiResponse } from '@shared/models/api-response';
import { Endpoints } from '@root/shared/functions/endpoints';


@Injectable()
export class HomeService extends DataService {
  private endpoints = Endpoints();
  constructor(http: HttpClient) 
  { 
    super(http);
  }

  getLibraryStat(): Observable<LibraryStatistics | null | undefined> {
    const url = this.endpoints.endpoints.Statistics;

    return this.get<ApiResponse<LibraryStatistics>>(`${url}`)
               .pipe(
                  map(x => x.data)
                );
  }
}
