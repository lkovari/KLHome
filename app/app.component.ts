import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']

})
export class AppComponent implements OnInit {
  constructor(private store: AngularFirestore) { }
  ngOnInit() {
    this.store.collection('table_pg12').valueChanges((value: any) => {
      console.log('table_pg12 value changes' + JSON.stringify(value));
    });
    this.store.collection('person').valueChanges((value: any) => {
      console.log('person value changes' + JSON.stringify(value));
    });
  }
}
