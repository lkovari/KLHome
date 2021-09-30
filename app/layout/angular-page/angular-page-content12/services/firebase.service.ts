import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { FormDataModel } from '../data-models/form-data.model';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private dbPath = '/examples/formarrayitems';
  angularFireListOfFormData: AngularFireList<FormDataModel>;

  constructor(private db: AngularFireDatabase) {
    this.angularFireListOfFormData = this.db.list(this.dbPath);
  }

  getAllFormArrayItems(): AngularFireList<FormDataModel> {
    return this.angularFireListOfFormData;
  }  

  createFormArrayItem(formData: FormDataModel): any {
    return this.angularFireListOfFormData.push(formData);
  }

  update(key: string, value: any): Promise<void> {
    return this.angularFireListOfFormData.update(key, value);
  }  

  delete(key: string): Promise<void> {
    return this.angularFireListOfFormData.remove(key);
  }

  deleteAll(): Promise<void> {
    return this.angularFireListOfFormData.remove();
  }

}
