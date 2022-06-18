import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[img1]'
})
export class LazyImageDirective {
  @Input() useLazy = false;
  constructor({ nativeElement }: ElementRef<HTMLImageElement>) {
    if (this.useLazy) {
      console.log('>>> Check loading lazy');
      const supports = 'loading' in HTMLImageElement.prototype;
      if (supports) {
        nativeElement.setAttribute('loading', 'lazy');
        console.log('>>> loading lazy is supported!');
      } else {
        console.log('>>> loading lazy is NOT supported!');
      }
    }
  }

}
