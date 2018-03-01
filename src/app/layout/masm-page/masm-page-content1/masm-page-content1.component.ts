import { Component, OnInit, ViewChild } from '@angular/core';
import { FileLoaderService } from 'app/shared/services/fileloader/file-loader.service';
import { OverlayPanel } from 'primeng/primeng';

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
  @ViewChild('numconvop') numconvOverlay: OverlayPanel;

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


  onTabOpen(event) {
    const ix = event.index;
    if (ix === 0) {
      this.loadFileContent('numconv.asm');
    } else if (ix === 1) {
      this.loadFileContent('realdttm.asm');
    } else if (ix === 2) {
      this.loadFileContent('anthem.asm');
    } else if (ix === 3) {
      this.loadFileContent('cmram.asm');
    } else if (ix === 4) {
      this.loadFileContent('vgacrt.asm');
    } else if (ix === 5) {
      this.loadFileContent('maker.asm');
    } else if (ix === 6) {
      this.loadFileContent('prime.asm');
    } else if (ix === 7) {
      this.loadFileContent('fs.asm');
    } else if (ix === 8) {
      this.loadFileContent('slow.asm');
    } else if (ix === 9) {
      this.loadFileContent('pcinfo.asm');
    } else if (ix === 10) {
      this.loadFileContent('ms.asm');
    }
  }

  textDisplayClosed(event) {
    this.isDisplayText = false;
  }
}
