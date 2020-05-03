import { Component, OnInit } from '@angular/core';
import { IBarChart } from 'src/app/shared/models/bar-chart/bar-chart-item.interface';

@Component({
  selector: 'app-angular-page-content9',
  templateUrl: './angular-page-content9.component.html',
  styleUrls: ['./angular-page-content9.component.scss']
})
export class AngularPageContent9Component implements OnInit {
  githubLogoPath: string;
  boardRows: Array<number> = [0, 1, 2, 3, 4, 5, 6, 7];
  boardColumns: Array<number> = [0, 1, 2, 3, 4, 5, 6, 7];
  boxes: Array<number>;
  fixHeightInRem = 15;
  barItems: IBarChart[] = [ { label: 'MASM', value: 9, color: '#FF9CEE' },
  { label: 'Delphi', value: 8, color: '#C5A3FF' },
  { label: 'ASP.NET C#', value: 1, color: '#F3FFE3' },
  { label: 'J2SE', value: 12, color: '#A79AFF' },
  { label: 'J2EE', value: 1, color: '#C4FAF8' },
  { label: 'Android', value: 10, color: '#DBFFD6' },
  { label: 'Objective-C', value: 9, color: '#FFFFD1' },
  { label: 'JavaScript', value: 2, color: '#FFABAB' },
  { label: 'Angular', value: 3, color: '#AFCBFF' } ];

  constructor() { }

  ngOnInit(): void {
    this.githubLogoPath = 'assets/githubmark/GitHub-Mark-32px.png';
    let ix = 0;
    this.boxes = [];
    for (ix = 0; ix <= 64; ix++) {
      this.boxes.push(ix);
    }
  }

  isEven(ix: number): boolean {
    return ((ix % 2) === 0);
  }

  determineBackgroundColor(rowIx: number, colIx: number): string {
    return this.isEven(colIx) ? this.isEven(rowIx) ? 'white' : 'black' : !this.isEven(rowIx) ? 'white' : 'black';
  }

  determineColor(rowIx: number, colIx: number): string {
    const color = this.determineBackgroundColor(rowIx, colIx);
    return color === 'white' ? 'black' : 'white';
  }

  boxNotation(colIx: number, rowIx: number): string {
    const cIx = colIx + 1;
    const res =  rowIx > 0 ? (rowIx * 8) + cIx : (rowIx + 1) * cIx;
    return  res < 10 ? '0' + res : '' + res;
  }

  determineBorder(colIx: number, rowIx: number): string {
    let border = '';
    if (colIx === 7) {
      border = border + ' border-right: 1px solid;'
    } else if (colIx === 0) {
      border = border + ' border-left: 1px solid;'
    }
    if (rowIx === 0) {
      border = border + ' border-top: 1px solid;'
    } else if (rowIx === 7) {
      border = border + ' border-bottom: 1px solid;'
    }
    return border;
  }

  isTopBorderNeed(rowIx: number): boolean {
    const needTop = (rowIx === 0);
    console.log('need top ' + needTop);
    return needTop;
  }

  isBottomBorderNeed(rowIx: number): boolean {
    return (rowIx === 7);
  }

  isLeftBorderNeed(colIx: number): boolean {
    return (colIx === 0);
  }

  isRightBorderNeed(colIx: number): boolean {
    return (colIx === 7);
  }

}
