import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  constructor() { }

  setValue(value: number): void {
    sessionStorage.setItem('state', JSON.stringify(value));
  }

  getValue(): number {
    const rawData = sessionStorage.getItem('state');
    if (rawData) 
    {
      return JSON.parse(rawData);
    }
    return 0;
  }
}
