import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuidGeneratorService {
  constructor() { }

  getUUID(): Observable<string> {
    let uuidValue;
    let k: number;
    for (k = 0; k < 32; k++) {  
      let randomValue = Math.random() * 16 | 0;  
      if ( k === 8 || k === 12 || k === 16 || k === 20) {  
        uuidValue += "-";
      }  
      uuidValue += (k == 12 ? 4 : (k == 16 ? (randomValue & 3 | 8) : randomValue)).toString(16);  
    }  
    return of(uuidValue); 
  }
}
