import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FormDataModel } from '../data-models/form-data.model';

@Injectable({
  providedIn: 'root'
})
export class DummyFormdataService {

  constructor() { }

  private sleep(ms: number) {
      return new Promise(resolve => setTimeout(resolve, ms));
  }

  saveData(data: FormDataModel): Observable<string> {
    const res = of(data.hexId);
    this.sleep(500);
    return res;
  }
}
