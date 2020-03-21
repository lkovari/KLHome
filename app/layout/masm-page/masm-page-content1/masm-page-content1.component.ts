import { Component, OnInit } from '@angular/core';
import { FileLoaderService } from '../../../shared/services/fileloader/file-loader.service';

@Component({
  selector: 'app-masm-page-content1',
  templateUrl: './masm-page-content1.component.html',
  styleUrls: ['./masm-page-content1.component.scss']
})
export class MasmPageContent1Component implements OnInit {
  isDisplayText = false;
  fileName: string;
  fileContent: string;
  masmSoureFileTitles: string[] = [];
  masmSourceFiles: string[] = [];


  constructor(private fileLoaderService: FileLoaderService) { }

  ngOnInit() {
    this.masmSoureFileTitles = [
      'NumConv converts values between numerical systems',
      'RealDtTm shows and sets the real time clock date and time',
      'Anthem plays the Hungarian National Anthem in the background with PC speaker',
      'CMRam reads and setup the CMOS RAM',
      'VGACRT setups the VGA CRT M6811 chip which controls the monitor screen refresh etc.',
      'Maker: simple demo, put the characters to random position and move the characters to the proper position to show a readable text',
      'Prime prime number generator with file handling /reading and writing/',
      'Fs file search with recursive back-tracking algorythm',
      'Slow after the program runs stay resident under 1Ch interrupts, monitors the keyboard buffer and to Ctrl-left Shift slows down ' +
       'the computer and Ctrl-right Shift increases the speed of the computer.',
      'PCINFO display gives internal information about your PC for example, 1st game ports, printer ports, DOS. ' +
       'version (made 1987) RS232 cards, etc.',
      'MS memory Spy displays the physical memory size with test. This little program contains a converter between numerical systems'
    ];
    this.masmSourceFiles = [
      'numconv.asm', 'realdttm.asm', 'anthem.asm', 'cmram.asm', 'vgacrt.asm',
      'maker.asm', 'prime.asm', 'fs.asm', 'slow.asm', 'pcinfo.asm', 'ms.asm'
    ];
  }

  loadFileContent(fileName: string) {
    this.fileLoaderService.loadtTextFile('masm', fileName, true).subscribe(fileContent => {
      this.fileName = fileName;
      this.fileContent = fileContent;
      this.isDisplayText = true;
      // console.log('File ' + this.numconvFileContent);
    });
  }

  textDisplayName(ix: number): string {
    return 'textDisplayName' + ix;
  }

  onTabOpen(event) {
    const ix = event.index;
    this.loadFileContent(this.masmSourceFiles[ix]);
  }

}
