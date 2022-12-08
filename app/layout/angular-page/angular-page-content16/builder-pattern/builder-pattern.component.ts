import { Component, OnInit } from '@angular/core';
import { TextUtils } from '../text-utils';

@Component({
  selector: 'app-builder-pattern',
  templateUrl: './builder-pattern.component.html',
  styleUrls: ['./builder-pattern.component.scss']
})
export class BuilderPatternComponent implements OnInit {
  pattern: string;
  numOfTextRows: number | undefined;
  
  constructor() { }

  ngOnInit(): void {
    this.pattern = `
    // Builder Concept Sample Code
    class Product {
        parts: string[] = [];
    }
    
    interface IBuilder {
        buildPartA(): this
        buildPartB(): this
        buildPartC(): this
        getResult(): Product
    }
    
    class Builder implements IBuilder {
        // The Concrete Builder
        product: Product;
    
        constructor() {
          this.product = new Product();
        }
    
        buildPartA() {
          this.product.parts.push('a');
          return this;
        }
    
        buildPartB() {
          this.product.parts.push('b');
          return this;
        }
    
        buildPartC() {
          this.product.parts.push('c');
          return this;
        }
    
        getResult() {
          return this.product;
        }
    }
    
    class Director {
        // The Director, building a complex representation
    
        static construct() {
          'Constructs and returns the final product'
          return new Builder().buildPartA().buildPartB().buildPartC().getResult();
        }
    }
    // The Client
    const PRODUCT1 = Director.construct();
    `;    
    this.numOfTextRows = TextUtils.countTextRow(this.pattern);    
  }

}
