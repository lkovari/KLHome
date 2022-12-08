import { Component, OnInit } from '@angular/core';
import { TextUtils } from '../text-utils';

@Component({
  selector: 'app-prototype-pattern',
  templateUrl: './prototype-pattern.component.html',
  styleUrls: ['./prototype-pattern.component.scss']
})
export class PrototypePatternComponent implements OnInit {
  pattern: string;
  numOfTextRows: number | undefined;

  constructor() { }

  ngOnInit(): void {
    this.pattern = `
    // A sample document to be used in the Prototype example
    import ProtoType from './iprototype'
    
    export default class Document implements ProtoType {
        name: string;
        array: [number[], number[]];
    
        constructor(name: string, array: [number[], number[]]) {
            this.name = name;
            this.array = array;
        }
    
        clone(mode: number): Document {
            ' This clone method uses different copy techniques '
            let array;
            if (mode === 2) {
                // results in a deep copy of the Document
                array = JSON.parse(JSON.stringify(this.array));
            } else {
                // default, results in a shallow copy of the Document
                array = Object.assign([], this.array);
            }
            return new Document(this.name, array);
        }
    }
    
    // Prototype Concept Sample Code
    
    import Document from "./document";
    
    export default interface IProtoType {
        // interface with clone method
        clone(mode: number): Document;
        // The clone, deep or shallow.
        // It is up to you how you  want to implement
        // the details in your concrete class"""
    }
    
    interface IProtoType {
        // interface with clone method
        clone(): this;
        // The clone is deep or shallow.
        // It is up to you how you want to implement
        // the details in your concrete class
    }
    
    class MyClass implements IProtoType {
        // A Concrete Class
        field: number[];
    
        constructor(field: number[]) {
            this.field = field; // any value of any type
        }
    
        clone() {
            return Object.assign({}, this); // shallow copy
            // return JSON.parse(JSON.stringify(this)); //deep copy
        }
    }
    
    // The Client
    const OBJECT1 = new MyClass([1, 2, 3, 4]); // Create an object containing an array
    console.log(\`OBJECT1: \${JSON.stringify(OBJECT1)}\`);
    
    const OBJECT2 = OBJECT1.clone(); // Clone
    console.log(\`OBJECT2: \${JSON.stringify(OBJECT2)}\`);
    // Change the value of one of the array elements in OBJECT2
    // Depending on your clone method, either a shallow or deep copy was performed
    OBJECT2.field[1] = 101;
    
    // Comparing OBJECT1 and OBJECT2
    console.log(\`OBJECT2: \${JSON.stringify(OBJECT2)}\`);
    console.log(\`OBJECT1: \${JSON.stringify(OBJECT1)}\`);
    `;
    this.numOfTextRows = TextUtils.countTextRow(this.pattern);
  }

}
