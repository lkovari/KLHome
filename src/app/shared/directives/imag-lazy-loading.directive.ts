import { AfterViewInit, Directive, ElementRef } from '@angular/core';

@Directive(
    { selector: 'img' }
)
export class ImageLazyLoadingDirective extends Directive implements AfterViewInit {

    constructor(private elementRef: ElementRef<HTMLImageElement>) {
        super();
    }
    
    ngAfterViewInit(): void {
        const img = this.elementRef.nativeElement;
        if ('loading' in HTMLImageElement.prototype) {
          img.setAttribute('loading', 'lazy');
          console.log('>>> loading lazy is supported!');
        } else {
          console.log('>>> loading lazy is NOT supported!');
        }
    }
}