import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { IUser } from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class FirebaseUsersService {
  private dbPath = '/examples/dummyusers';
  angularFireListOfUsers: AngularFireList<IUser>;

  constructor(private db: AngularFireDatabase) {
    this.angularFireListOfUsers = this.db.list(this.dbPath);
  }

  getAllUsers(): AngularFireList<IUser> {
    return this.angularFireListOfUsers;
  }  

  createUser(user: IUser): any {
    return this.angularFireListOfUsers.push(user);
  }

  update(key: string, value: any): Promise<void> {
    return this.angularFireListOfUsers.update(key, value);
  }  

  deleteUser(key: string): Promise<void> {
    return this.angularFireListOfUsers.remove(key);
  }

  deleteAllUser(): Promise<void> {
    return this.angularFireListOfUsers.remove();
  }  
}
