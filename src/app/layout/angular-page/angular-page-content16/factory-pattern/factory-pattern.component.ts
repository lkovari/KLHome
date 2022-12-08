import { Component, OnInit } from '@angular/core';
import { TextUtils } from '../text-utils';

@Component({
  selector: 'app-factory-pattern',
  templateUrl: './factory-pattern.component.html',
  styleUrls: ['./factory-pattern.component.scss']
})
export class FactoryPatternComponent implements OnInit {
  pattern: string;
  numOfTextRows: number | undefined;

  constructor() { }

  ngOnInit(): void {
    this.pattern = 
  `  interface IProduct {
      name: string
  }
  
  class ConcreteProduct implements IProduct {
      name = ''
  }
  
  class ConcreteProductA extends ConcreteProduct {
      constructor() {
          super()
          this.name = 'ConcreteProductA'
      }
  }
  
  class ConcreteProductB extends ConcreteProduct {
      constructor() {
          super()
          this.name = 'ConcreteProductB'
      }
  }
  
  class ConcreteProductC extends ConcreteProduct {
      constructor() {
          super()
          this.name = 'ConcreteProductC'
      }
  }
  
  class Creator {
      static createObject(someProperty: string): IProduct {
          if (someProperty === 'a') {
              return new ConcreteProductA()
          } else if (someProperty === 'b') {
              return new ConcreteProductB()
          } else {
              return new ConcreteProductC()
          }
      }
  }`;
    this.numOfTextRows = TextUtils.countTextRow(this.pattern);
  }
}
