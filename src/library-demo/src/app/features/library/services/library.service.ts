import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from '@root/shared/base/data.service';

@Injectable()
export class LibraryService extends DataService {

  constructor(http: HttpClient) {
    super(http);
   }

   
}
