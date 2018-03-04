import { Component, OnInit } from '@angular/core';
import { FileLoaderService } from 'app/shared';

@Component({
  selector: 'app-delphi-page-content4',
  templateUrl: './delphi-page-content4.component.html',
  styleUrls: ['./delphi-page-content4.component.scss']
})
export class DelphiPageContent4Component implements OnInit {
  isDisplayText = false;
  fileName: string;
  fileContent: string;

  constructor(private fileLoaderService: FileLoaderService) { }

  loadFileContent(fileName: string) {
    this.fileLoaderService.loadtTextFile('pas', fileName).subscribe(fileContent => {
      this.fileName = fileName;
      this.fileContent = fileContent;
      this.isDisplayText = true;
      // console.log('File ' + this.numconvFileContent);
    });
  }

  ngOnInit() {
  }

  onTabOpen(event) {
    const ix = event.index;
    if (ix === 0) {
      this.loadFileContent('Snake.pas');
    } else if (ix === 1) {
      this.loadFileContent('a5x5.pas');
    }
  }

}
