import { Component, OnInit } from '@angular/core';
import { IBarChart } from 'src/app/shared/models/bar-chart/bar-chart-item.interface';
import { Orientation } from 'src/app/shared/models/bar-chart/orientation.model';
import { BarChartOrientation } from 'src/app/shared/models/bar-chart/bar-chart-orientation.enum';

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
  fixHeightInRem = 40;
  barItems: IBarChart[] = [ { id: 0, label: 'MASM', value: 9, color: '#FF9CEE' },
  { id: 1, label: 'Delphi', value: 8, color: '#C5A3FF' },
  { id: 2, label: 'ASP.NET C#', value: 1, color: '#F3FFE3' },
  { id: 3, label: 'J2SE', value: 12, color: '#A79AFF' },
  { id: 4, label: 'J2EE', value: 1, color: '#C4FAF8' },
  { id: 5, label: 'Android', value: 6, color: '#DBFFD6' },
  { id: 6, label: 'Objective-C', value: 9, color: '#FFFFD1' },
  { id: 7, label: 'JavaScript', value: 2, color: '#FFABAB' },
  { id: 8, label: 'Angular', value: 3, color: '#AFCBFF' } ];
  orientations: Orientation[] = [
    { value: BarChartOrientation.BOTTOM_TO_TOP, label: 'Bottom to Top', orientation: BarChartOrientation.BOTTOM_TO_TOP },
    { value: BarChartOrientation.TOP_TO_BOTTOM, label: 'Top to Bottom', orientation: BarChartOrientation.TOP_TO_BOTTOM },
    { value: BarChartOrientation.LEFT_TO_RIGHT, label: 'Left to Right', orientation: BarChartOrientation.LEFT_TO_RIGHT },
    { value: BarChartOrientation.RIGHT_TO_LEFT, label: 'Right to Left', orientation: BarChartOrientation.RIGHT_TO_LEFT }
  ];
  selectedOrientation: Orientation = this.orientations[0];
  selectedEnumOrientation: BarChartOrientation = BarChartOrientation.BOTTOM_TO_TOP;

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

  onOrientationChange(event: any) {
    this.selectedEnumOrientation = this.selectedOrientation.orientation;
    console.log('onOrientationChanged ' +  event + ' -> ' + BarChartOrientation[this.selectedEnumOrientation]);
  }
}
