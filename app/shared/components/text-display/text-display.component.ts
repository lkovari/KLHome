import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-text-display',
  templateUrl: './text-display.component.html',
  styleUrls: ['./text-display.component.scss']
})
export class TextDisplayComponent implements OnInit {
  private _fileContent: string;
  @Input() visible: boolean;
  @Input() fileName: string;
  @Input()
  get fileContent(): string {
    return this._fileContent;
  }
  set fileContent(v: string) {
    this._fileContent = v;
  }
  @Output() textDisplayClosed = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
    console.log(this.fileContent);
  }

  onClose() {
    this.textDisplayClosed.emit(null);
  }

  onDone() {
    this.textDisplayClosed.emit(null);
  }
}
