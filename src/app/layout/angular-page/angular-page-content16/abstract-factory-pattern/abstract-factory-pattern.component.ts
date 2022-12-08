import { Component, OnInit } from '@angular/core';
import { TextUtils } from '../text-utils';

@Component({
  selector: 'app-abstract-factory-pattern',
  templateUrl: './abstract-factory-pattern.component.html',
  styleUrls: ['./abstract-factory-pattern.component.scss']
})
export class AbstractFactoryPatternComponent implements OnInit {
  pattern: string;
  numOfTextRows: number | undefined;

  constructor() { }

  ngOnInit(): void {
    this.pattern = 
   `   import {FactoryA, IProductA} from './factory-a'
    import {FactoryB, IProductB} from './factory-b'
    
    interface IProduct extends IProductA, IProductB {}
    
    class AbstractFactory {
        // The Abstract Factory Concrete Class
    
        static createObject(factory: string): IProduct | undefined {
            try {
                if (['aa', 'ab', 'ac'].indexOf(factory) > -1) {
                    return FactoryA.getObject(factory[1])
                }
                if (['ba', 'bb', 'bc'].indexOf(factory) > -1) {
                    return FactoryB.getObject(factory[1])
                }
                throw new Error('No Factory Found')
            } catch (e) {
                console.log(e)
            }
        }
    }`;
    this.numOfTextRows = TextUtils.countTextRow(this.pattern);
  }
}
