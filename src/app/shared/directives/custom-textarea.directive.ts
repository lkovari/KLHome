import { Directive, ElementRef, Optional, EventEmitter, Output, Input, DoCheck, HostListener } from '@angular/core';
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
export class CustomTextAreaDirective implements DoCheck  {
  @Input() autoSize: boolean;
  @Input() autoSizeLimit = 10;
  @Output() onResize: EventEmitter<any> = new EventEmitter();
  filled: boolean;

  constructor(public el: ElementRef, @Optional() public ngModel: NgModel) { }

  ngDoCheck() {
    this.updateFilledState();
    if (this.autoSize) {
        this.resize();
    }
  }

  @HostListener('input', ['$event'])
  onInput(e) {
      this.updateFilledState();
      if (this.autoSize) {
          this.resize(e);
      }
  }

  updateFilledState() {
    this.filled = (this.el.nativeElement.value && this.el.nativeElement.value.length) || (this.ngModel && this.ngModel.model);
  }

  @HostListener('focus', ['$event'])
  onFocus(e) {
    if (this.autoSize) {
        this.resize(e);
    }
  }

  @HostListener('blur', ['$event'])
  onBlur(e) {
    if (this.autoSize) {
        this.resize(e);
    }
  }
  resize(event?: Event) {
    this.el.nativeElement.style.height = 'auto';
    this.el.nativeElement.style.height = this.el.nativeElement.scrollHeight + 'px';
    const maxHeightLimitReached = this.el.nativeElement.scrollHeight > this.autoSizeLimit;
    if (parseFloat(this.el.nativeElement.style.height) >= parseFloat(this.el.nativeElement.style.maxHeight)) {
        this.el.nativeElement.style.overflowY = 'scroll';
        this.el.nativeElement.style.height = this.el.nativeElement.style.maxHeight;
    } else {
        this.el.nativeElement.style.overflow = 'hidden';
    }
    if (maxHeightLimitReached) {
      this.el.nativeElement.style.overflowY = 'scroll';
      this.el.nativeElement.style.height = this.autoSizeLimit + 'px';
    } /*else {
      this.el.nativeElement.style.overflow = 'hidden';
      this.el.nativeElement.style.height = this.el.nativeElement.scrollHeight;
    }*/
    this.onResize.emit(event || {});
  }
}
