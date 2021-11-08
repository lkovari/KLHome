import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { ZipCode } from '../data-model/zipcode.model';

@Injectable({
  providedIn: 'root'
})
export class ZipCodeService {
  zipCodes: Array<ZipCode>;
  private dbPath = '/examples/zipcodes';
  angularFireListOfZipCodes: AngularFireList<ZipCode>;

  constructor(private db: AngularFireDatabase) {
    this.angularFireListOfZipCodes = this.db.list(this.dbPath);
  }

  getAllFormArrayItems(): AngularFireList<ZipCode> {
    return this.angularFireListOfZipCodes;
  }  

  createFormArrayItem(formData: ZipCode): any {
    return this.angularFireListOfZipCodes.push(formData);
  }

  update(key: string, value: any): Promise<void> {
    return this.angularFireListOfZipCodes.update(key, value);
  }  

  delete(key: string): Promise<void> {
    return this.angularFireListOfZipCodes.remove(key);
  }

  deleteAll(): Promise<void> {
    return this.angularFireListOfZipCodes.remove();
  }

  extracZipCodeArray(): Observable<ZipCode[]> {
    let obj$ = <Observable<ZipCode[]>>this.angularFireListOfZipCodes.snapshotChanges().pipe(
      map(changes => changes.map(c =>
        ( { key: c.payload.key, ...c.payload.val() } )
      )
    ));
  return obj$;
}

  private findZipCode(zipCode: number): boolean {
    const found =  this.zipCodes.find((item: ZipCode) => {
      return item.zipCode === zipCode;
    });
    // for logging...
    if (found) {
      console.log(`ZIP found : ${JSON.stringify(found)}.`);
    } else {
      console.log(`ZIP not found! : ${zipCode}.`);
    }
    return found !== null && found !== undefined;
  }

  zipCodeExists(zipCode: number, cached: boolean): Observable<boolean> {
    if (!this.zipCodes || (this.zipCodes && this.zipCodes.length < 1)) {
      this.zipCodes = [];
      this.extracZipCodeArray().subscribe(items => {
        items.forEach((item: any) => {
          this.zipCodes.push(item);
        });
        return of(this.findZipCode(zipCode));
      });
    } else {
      return of(this.findZipCode(zipCode));0
    }
    if (!cached) {
      this.zipCodes = [];
    }
    return of(false);
  }

}
