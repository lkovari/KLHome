import { Directive, ElementRef, Optional, EventEmitter, Output, Input, DoCheck, HostListener, Renderer2, OnInit, AfterViewInit } from '@angular/core';
import { NgModel } from '@angular/forms';

@Directive({
  selector: '[appCustomTextArea]',
  host: {
    '[class.customtext]': 'true',
    '[class.customtextarea-resizable]': 'autoSize',
    '[class.state-default]': 'true',
    '[class.state-filled]': 'filled'
  }
})
export class CustomTextAreaDirective implements OnInit, AfterViewInit, DoCheck  {
  private oneRowHeight = 21.85;
  private autoSizeLimitPX: number;
  private _autoSizeLimit: number;
  filled: boolean;
  @Input() autoSize: boolean;
  @Input() defaultRows = 3;
  @Input()
  set autoSizeLimit(v: number) {
    if (v) {
      this._autoSizeLimit = v;
      this.autoSizeLimitPX = (this.oneRowHeight * this._autoSizeLimit);
    }
  }
  get autoSizeLimit(): number {
    return this._autoSizeLimit;
  }
  // tslint:disable-next-line:member-ordering
  @Output() onResize: EventEmitter<any> = new EventEmitter();

  constructor(private renderer: Renderer2, public elementRef: ElementRef, @Optional() public ngModel: NgModel) { }

  determineStyle(elementRef: ElementRef, styleProp) {
    const element = elementRef.nativeElement;
    let elementStyle = '29';
    if (element) {
      if (element.currentStyle) {
        elementStyle = element.currentStyle[styleProp];
      } else {
        elementStyle = element.ownerDocument.defaultView.getComputedStyle(element, null).getPropertyValue(styleProp);
      }
    }
    return elementStyle;
  }

  ngOnInit(): void {
    this.oneRowHeight = this.elementRef.nativeElement.offsetHeight / this.defaultRows;
    if (this.elementRef.nativeElement.value && this.elementRef.nativeElement.value.length > 0) {
      this.renderer.setStyle(this.elementRef.nativeElement, 'height', 'auto');
    } else {
      this.renderer.setStyle(this.elementRef.nativeElement, 'height', (this.defaultRows * this.oneRowHeight) + 'px');
    }
  }

  ngAfterViewInit(): void {
    this.oneRowHeight = this.elementRef.nativeElement.offsetHeight / this.defaultRows;
    this.autoSizeLimitPX = (this.oneRowHeight * this._autoSizeLimit);
  }

  ngDoCheck() {
    this.updateFilledState();
    if (this.autoSize) {
        this.resize();
    }
  }

  @HostListener('input', ['$event'])
  onInput(event: Event) {
      this.updateFilledState();
      if (this.autoSize) {
          this.resize(event);
      }
  }

  updateFilledState() {
    this.filled = (this.elementRef.nativeElement.value
      && this.elementRef.nativeElement.value.length) || (this.ngModel && this.ngModel.model);
  }

  @HostListener('focus', ['$event'])
  onFocus(event: Event) {
    if (this.autoSize) {
        this.resize(event);
    }
  }

  @HostListener('blur', ['$event'])
  onBlur(event: Event) {
    if (this.autoSize) {
        this.resize(event);
    }
  }
  resize(event?: Event) {
    this.renderer.setStyle(this.elementRef.nativeElement, 'height', 'auto');
    this.renderer.setStyle(this.elementRef.nativeElement, 'height', this.elementRef.nativeElement.scrollHeight + 'px');
    if (parseFloat(this.elementRef.nativeElement.style.height) >= parseFloat(this.elementRef.nativeElement.style.maxHeight)) {
        this.renderer.setStyle(this.elementRef.nativeElement, 'overflowY', 'scroll');
        this.renderer.setStyle(this.elementRef.nativeElement, 'height', this.elementRef.nativeElement.style.maxHeight);
    } else {
        this.renderer.setStyle(this.elementRef.nativeElement, 'overflow', 'hidden');
    }
    if (this.elementRef.nativeElement.scrollHeight > this.autoSizeLimitPX) {
      this.renderer.setStyle(this.elementRef.nativeElement, 'overflowY', 'scroll');
      this.renderer.setStyle(this.elementRef.nativeElement, 'height', this.autoSizeLimitPX + 'px');
    }
    this.onResize.emit(event || {});
  }
}
