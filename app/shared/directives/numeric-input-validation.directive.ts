import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, NgControl } from '@angular/forms';
import { Subscription } from 'rxjs/internal/Subscription';


@Directive({
  selector: '[appNumericInputValidation]'
})
export class NumericInputValidationDirective implements OnInit, OnDestroy {
  private digitInt = 6;
  private digitFrac = 2;
  private subscription: Subscription;
  previousFraction: number;
  previousValue: string | null;
  private elementRef : ElementRef;

  @Input() intDigits = this.digitInt;
  @Input() fractionDigits = this.digitFrac;

  constructor(private numeFormControl: NgControl, er : ElementRef) {
    this.elementRef = er;
  }

  ngOnInit(): void {
    this.numberValidation();
    this.previousFraction = Number.MIN_VALUE;
    this.previousValue = null;
  }

  /**
   * 
   * @param v number - number
   * @returns boolean - if true has fraction part of the number
   */
  private hasFractionPart(v: number): boolean {
    const intPart = Math.trunc(v);
    const frac = v - intPart;
    return frac > 0;
  }

  /**
   * 
   * @param v number - the number
   * @param decFracDigit : number - allowed # of decimal fractiopn digits
   * @returns boolean - if true the number fraction digits is greater than the allowed
   */
  private fractionGreaterThan(v: number, decFracDigit: number): boolean {
    let res = false;
    // convert to string;
    const vs = '' + v;
    // has fraction part ?
    if (vs.indexOf('.') > -1) {
      const v_split = vs.split('.');
      const frac_s = v_split[1];
      // greater than the allowed fraction digits?
      res = frac_s.length > decFracDigit;
    }
    return res;
  }

  /**
   * 
   * @param intDigit number - allowed integer digits
   * @param fracDigit number - allowed decimal fraction digits
   * @returns number - the maximum allowed amount based on the integer and decimal fraction digits
   */
  private constructMmaxLimit(intDigit: number, fracDigit: number): number {
    let integerPart = '';
    let fractionPart = '';
    
    let ix = 0;
    while(ix < intDigit) {
      integerPart += '9';
      ix++;
    }
    ix = 0;
    while(ix < fracDigit) {
      fractionPart += '9';
      ix++;
    }
    let res = integerPart + '.' + fractionPart;
    return +res;
  }

  /**
   * 
   * @param v string - number representation in a string
   * @returns boolean - if true contains only zero characters
   */
  private containsZeroOnly(v: string): boolean {
    let res = false;
    if (v) {
      let ix = 0;
      let zeroCnt = 0;
      // v1 count zeros
      for (ix = 0; ix < v.length; ix++) {
        zeroCnt += v.charAt(ix) === '0' ? 1 : 0;
      }
      res = zeroCnt === v.length;
      // v2 parse to number 
      if (!Number.isNaN(+v)) {
        // contains decimal point?
        let numValue = -1;
        if (v.split('.').length === 2) {
          numValue = Number.parseFloat(v);
        } else {
          numValue = Number.parseInt(v);
        }
        res = numValue === 0;
      }
    }
    return res;
  }

  /*
  private nativeElementContainZerosOnly(v: string): boolean {
    let res = false;
    if (v) {
      const parts = v.split('.');
      if (parts.length === 1) {
        res = this.containsZeroOnly(parts[0]);
      } else {
        res = (this.containsZeroOnly(parts[0]) && this.containsZeroOnly(parts[1]));
      }
    }
    return res;
  }
  */

  private nativeElementIntegerContainsZeroOnly(v: string): boolean {
    let res = false;
    if (v) {
      const parts = v.split('.');
      if (parts.length === 1) {
        res = this.containsZeroOnly(parts[0]);
      }      
    }
    return res;
  }

  private nativeElementFractionContainsZeroOnly(v: string): boolean {
    let res = false;
    if (v) {
      const parts = v.split('.');
      if (parts.length === 2) {
        res = this.containsZeroOnly(parts[1]);
      }      
    }
    return res;
  }

  private nativeElementIntegerIsOutOfTheLimit(v: string): boolean {
    let res = false;
    if (v) {
      const parts = v.split('.');
      if (parts.length === 1) {
        res = parts[0].length > this.intDigits;      
      }
    }
    return res;
  }

  private nativeElementFractionIsOutOfTheLimit(v: string): boolean {
    let res = false;
    if (v) {
      const parts = v.split('.');
      if (parts.length === 2) {
        res = parts[1].length > this.fractionDigits;      
      }
    }
    return res;
  }

  /*
  private nativeElementOutOfLimits(v: string): boolean {
    let res = false;
    if (v) {
      const parts = v.split('.');
      if (parts.length === 1) {
        res = parts[0].length > this.intDigits;
      }
      else {
        res = parts[0].length > this.intDigits || parts[1].length > this.fractionDigits;
      }
    }
    return res;
  }
  */

  private numberValidation() {
      const numericFormControl = <FormControl>this.numeFormControl.control;
      const maxNumber = this.constructMmaxLimit(this.intDigits, this.fractionDigits);
      const mulAndDiv = Math.pow(10, this.fractionDigits);
      this.subscription = numericFormControl.valueChanges.subscribe(data => {
        const value = this.elementRef.nativeElement.value;
        // int contains zeros only and out of the limit
        if (this.nativeElementIntegerContainsZeroOnly(value) && this.nativeElementIntegerIsOutOfTheLimit(value)) {
          numericFormControl.patchValue(this.previousValue);
        } else {
          this.previousValue = value;
        } 
        if (this.nativeElementFractionContainsZeroOnly(value) && this.nativeElementFractionIsOutOfTheLimit(value)) {
          numericFormControl.patchValue(null);
        } else {
          this.previousValue = value;
        }

        let vv = 0;
        let v = data;
        console.log('v ' + v);
        if (v) {
          // the number is greater than the max allowed?
          if (v > maxNumber) {
            // has decimal fraction part?
            if (this.hasFractionPart(v)) {
              const intPart = Math.trunc(v);
              let frac = v - intPart;
              frac = +(Math.trunc(frac * mulAndDiv) / mulAndDiv).toFixed(this.fractionDigits);
              vv = intPart + frac;
            } else {
              vv = Math.trunc(+(v / 10).toFixed(1));
            }
          } else {
            // decimal fraction part digits is greater than the maximum allowed?
            if (this.fractionGreaterThan(v, this.fractionDigits)) {
              const intPart = Math.trunc(v);
              let frac = v - intPart;
              if (this.previousFraction !== Number.MIN_VALUE) {
                frac = this.previousFraction;
              } else {
                frac = +((frac * mulAndDiv) / mulAndDiv).toFixed(this.fractionDigits);
                this.previousFraction = frac;
              }
              vv = intPart + frac;
            } else {
              const intPart = Math.trunc(v);
              let frac = v - intPart;
              // has decimal fraction part?
              if (this.hasFractionPart(v)) {
                frac = +((frac * mulAndDiv) / mulAndDiv).toFixed(this.fractionDigits);
                this.previousFraction = frac;
                vv = intPart + frac;
              } else {
                vv = intPart;
              }
            }
          }
          // prevent to skip dot
          if (v !== vv) {
            v = vv;
            numericFormControl.patchValue(v);
          }
        }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
