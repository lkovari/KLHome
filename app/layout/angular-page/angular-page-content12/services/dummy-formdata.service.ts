import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FormDataModel } from '../data-models/form-data.model';

@Injectable({
  providedIn: 'root'
})
export class DummyFormdataService {
  private SIMULATED_SERVICE_CALL_EXECUTION_TIME = 3000;

  constructor() { }

  saveData(data: FormDataModel): Observable<string> {
    return Observable.create(obs => {
      setTimeout(() => {
        obs.next(data.hexId);
        obs.complete();
      }, this.SIMULATED_SERVICE_CALL_EXECUTION_TIME);
    });
  }
}
