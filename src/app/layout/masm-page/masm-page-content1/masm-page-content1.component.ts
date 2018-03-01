import { Component, OnInit } from '@angular/core';
import { FileLoaderService } from 'app/shared/services/fileloader/file-loader.service';

@Component({
  selector: 'app-masm-page-content1',
  templateUrl: './masm-page-content1.component.html',
  styleUrls: ['./masm-page-content1.component.scss']
})
export class MasmPageContent1Component implements OnInit {
  numconvFileContent: string;
  isDisplayText = false;
  fileName: string;
  fileContent: string;

  constructor(private fileLoaderService: FileLoaderService) { }

  ngOnInit() {
  }

  loadFileContent(fileName: string) {
    this.fileLoaderService.loadtTextFile(fileName).subscribe(fileContent => {
      this.fileName = fileName;
      this.fileContent = fileContent;
      this.isDisplayText = true;
      // console.log('File ' + this.numconvFileContent);
    });
}


  onClickNumconv() {
    this.loadFileContent('numconv.asm');
  }

  onClickRealdttm() {
    this.loadFileContent('realdttm.asm');
  }

  onClickAnthem() {
    this.loadFileContent('anthem.asm');
  }

  onClickCmram() {
    this.loadFileContent('cmram.asm');
  }

  onClickVgacrt() {
    this.loadFileContent('vgacrt.asm');
  }

  onClickMaker() {
    this.loadFileContent('maker.asm');
  }

  onClickPrime() {
    this.loadFileContent('prime.asm');
  }

  onClickFs() {
    this.loadFileContent('fs.asm');
  }

  onClickSlow() {
    this.loadFileContent('slow.asm');
  }

  onClickPcinfo() {
    this.loadFileContent('pcinfo.asm');
  }

  onClickMs() {
    this.loadFileContent('ms.asm');
  }

  textDisplayClosed(event) {
    this.isDisplayText = false;
  }
}
