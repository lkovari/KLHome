import { Directive, ElementRef, Optional, EventEmitter, Output, Input, DoCheck, HostListener, Renderer2, OnInit, AfterViewChecked } from '@angular/core';
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
export class CustomTextAreaDirective implements OnInit, AfterViewChecked, DoCheck  {
  private oneRowHeight = 21.85;
  private autoSizeLimitPX: number;
  private _autoSizeLimit: number;
  textArea: HTMLTextAreaElement;
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
    return +this._autoSizeLimit;
  }
  // tslint:disable-next-line:member-ordering
  @Output() onResize: EventEmitter<any> = new EventEmitter();

  constructor(private renderer: Renderer2, public elementRef: ElementRef, @Optional() public ngModel: NgModel) { }


  private countRows(): number {
    let rows = 0;
    if (this.textArea.value.indexOf('\n') !== -1) {
      const regEx = new RegExp('\n', 'gi');
      if (this.textArea && this.textArea.value) {
        rows =  this.elementRef.nativeElement.value.match(regEx).length + 1;
      }
    }
    return rows;
  }

  ngOnInit(): void {
    this.textArea = this.elementRef.nativeElement as HTMLTextAreaElement;
    this.oneRowHeight = this.textArea.offsetHeight / +this.defaultRows;
    if (this.textArea.value && this.elementRef.nativeElement.value.length > 0) {
      this.renderer.setStyle(this.textArea, 'height', 'auto');
    } else {
      this.renderer.setStyle(this.textArea, 'height', (+this.defaultRows * this.oneRowHeight) + 'px');
    }
  }

  ngAfterViewChecked(): void {
    this.textArea = this.elementRef.nativeElement as HTMLTextAreaElement;
    const totalRows = this.countRows();
    const rows = Math.max(+this.defaultRows, totalRows);
    if (rows < this.autoSizeLimit) {
      this.oneRowHeight = Math.ceil(this.textArea.clientHeight / rows);
      this.autoSizeLimitPX = (this.oneRowHeight * this.autoSizeLimit);
    }
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
    this.textArea = this.elementRef.nativeElement as HTMLTextAreaElement;
    this.renderer.setStyle(this.textArea, 'height', 'auto');
    this.renderer.setStyle(this.textArea, 'height', this.textArea.scrollHeight + 'px');
    if (parseFloat(this.textArea.style.height) >= parseFloat(this.textArea.style.maxHeight)) {
        this.renderer.setStyle(this.textArea, 'overflowY', 'scroll');
        this.renderer.setStyle(this.textArea, 'height', this.textArea.style.maxHeight);
    } else {
        this.renderer.setStyle(this.textArea, 'overflow', 'hidden');
    }
    if (this.textArea.clientHeight > this.autoSizeLimitPX) {
      this.renderer.setStyle(this.textArea, 'overflowY', 'scroll');
      this.renderer.setStyle(this.textArea, 'height', this.autoSizeLimitPX + 'px');
    }
    this.onResize.emit(event || {});
  }
}
