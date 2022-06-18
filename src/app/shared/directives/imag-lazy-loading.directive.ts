import { AfterViewInit, Directive, ElementRef } from '@angular/core';

@Directive(
  { selector: 'img' } // the selection target is the img HTML element
)
export class ImageLazyLoadingDirective extends Directive implements AfterViewInit {

  constructor(private elementRef: ElementRef<HTMLImageElement>) {
    super();
  }

  ngAfterViewInit(): void {
    const img = this.elementRef.nativeElement;
    if ('loading' in HTMLImageElement.prototype) {
      img.setAttribute('loading', 'lazy');
      console.log('>>> Attribute loading="lazy" is set to img element src="' + img.src + '"');
    } else {
      console.log('>>> loading lazy is NOT supported!');
    }
  }
}
