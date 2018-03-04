import { Component, OnInit } from '@angular/core';
import { FileLoaderService } from 'app/shared';

@Component({
  selector: 'app-masm-page-content2',
  templateUrl: './masm-page-content2.component.html',
  styleUrls: ['./masm-page-content2.component.scss']
})
export class MasmPageContent2Component implements OnInit {
  isDisplayText = false;
  fileName: string;
  fileContent: string;

  constructor(private fileLoaderService: FileLoaderService) { }

  loadFileContent(fileName: string) {
    this.fileLoaderService.loadtTextFile(fileName).subscribe(fileContent => {
      this.fileName = fileName;
      this.fileContent = fileContent;
      this.isDisplayText = true;
      // console.log('File ' + this.numconvFileContent);
    });
  }

  ngOnInit() {
    this.loadFileContent('bios.asm');
  }

}
