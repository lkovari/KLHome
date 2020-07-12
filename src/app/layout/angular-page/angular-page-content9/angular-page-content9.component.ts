import { Component, OnInit } from '@angular/core';
import { IBarChart } from 'src/app/shared/models/bar-chart/bar-chart-item.interface';
import { Orientation } from 'src/app/shared/models/bar-chart/orientation.model';
import { BarChartOrientation } from 'src/app/shared/models/bar-chart/bar-chart-orientation.enum';
import { SelectItem } from 'primeng';
import { USState } from 'src/app/shared/models/usstate/us-state';
import { Person } from './person.model';

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
  { id: 2, label: 'ASP.NET C#', value: 2.1, color: '#F3FFE3' },
  { id: 3, label: 'J2SE', value: 12, color: '#A79AFF' },
  { id: 4, label: 'J2EE', value: 1, color: '#C4FAF8' },
  { id: 5, label: 'Android', value: 6, color: '#DBFFD6' },
  { id: 6, label: 'Objective-C', value: 1.5, color: '#FFFFD1' },
  { id: 7, label: 'JavaScript', value: 2, color: '#FFABAB' },
  { id: 8, label: 'Angular', value: 3, color: '#AFCBFF' } ];
  orientations: Orientation[] = [
    { value: BarChartOrientation.BOTTOM_TO_TOP, label: 'Bottom to Top', orientation: BarChartOrientation.BOTTOM_TO_TOP },
    { value: BarChartOrientation.TOP_TO_BOTTOM, label: 'Top to Bottom', orientation: BarChartOrientation.TOP_TO_BOTTOM },
    { value: BarChartOrientation.LEFT_TO_RIGHT, label: 'Left to Right', orientation: BarChartOrientation.LEFT_TO_RIGHT },
    { value: BarChartOrientation.RIGHT_TO_LEFT, label: 'Right to Left', orientation: BarChartOrientation.RIGHT_TO_LEFT }
  ];
  sortOptions: SelectItem[] = [ { label: 'Original', value: 1 }, { label: 'Ascending', value: 2 }, { label: 'Descending', value: 3 } ];
  selectedSortOption = 1;
  selectedOrientation: Orientation = this.orientations[0];
  selectedEnumOrientation: BarChartOrientation = BarChartOrientation.BOTTOM_TO_TOP;
  stateArray: Array<USState>;
  personModel: Person;

  constructor() { }

  ngOnInit(): void {
    this.githubLogoPath = 'assets/githubmark/GitHub-Mark-32px.png';
    this.personModel = new Person();
    this.initializeStates();
    let ix = 0;
    this.boxes = [];
    for (ix = 0; ix <= 64; ix++) {
      this.boxes.push(ix);
    }
  }

  private initializeStates() {
    this.stateArray = [
      { id: 1, acronym: 'AL', name: 'Alabana'},
      { id: 2, acronym: 'AK', name: 'Alaska' },
      { id: 3, acronym: 'AZ', name: 'Arizona'},
      { id: 4, acronym: 'AR', name: 'Arkansas'},
      { id: 5, acronym: 'CA', name: 'California'},
      { id: 6, acronym: 'CO', name: 'Colorado'},
      { id: 7, acronym: 'CT', name: 'Conecticut'},
      { id: 8, acronym: 'DE', name: 'Delaware'},
      { id: 9, acronym: 'DC', name: 'District Of Columbia'},
      { id: 10, acronym: 'FL', name: 'Florida'},
      { id: 11, acronym: 'GA', name: 'Georgia'},
      { id: 12, acronym: 'HI', name: 'Hawaii'},
      { id: 13, acronym: 'ID', name: 'Idaho'},
      { id: 14, acronym: 'IL', name: 'Illinois'},
      { id: 15, acronym: 'IN', name: 'Indiana'},
      { id: 16, acronym: 'IA', name: 'Iowa'},
      { id: 17, acronym: 'KS', name: 'Kansas'},
      { id: 18, acronym: 'KY', name: 'Kentucky'},
      { id: 19, acronym: 'LA', name: 'Louisiana'},
      { id: 20, acronym: 'ME', name: 'Maine'},
      { id: 21, acronym: 'MD', name: 'Maryland'},
      { id: 22, acronym: 'MA', name: 'Massachusetts'},
      { id: 23, acronym: 'MI', name: 'Michigan'},
      { id: 24, acronym: 'MN', name: 'Minnesota'},
      { id: 25, acronym: 'MS', name: 'Mississippi'},
      { id: 26, acronym: 'MO', name: 'Missouri'},
      { id: 27, acronym: 'MT', name: 'Montana'},
      { id: 28, acronym: 'NT', name: 'Nebraska'},
      { id: 29, acronym: 'NV', name: 'Nevada'},
      { id: 30, acronym: 'NH', name: 'New Hampshire'},
      { id: 31, acronym: 'NJ', name: 'New Jersey'},
      { id: 32, acronym: 'NM', name: 'New Mexico'},
      { id: 33, acronym: 'NY', name: 'New York'},
      { id: 34, acronym: 'NC', name: 'North Carolina'},
      { id: 35, acronym: 'ND', name: 'North Dakota'},
      { id: 36, acronym: 'OH', name: 'Ohio'},
      { id: 37, acronym: 'OK', name: 'Oklahoma'},
      { id: 38, acronym: 'OR', name: 'Oregon'},
      { id: 39, acronym: 'PA', name: 'Pennsylvania'},
      { id: 40, acronym: 'RI', name: 'Rhode Island'},
      { id: 14, acronym: 'SC', name: 'South Carolina'},
      { id: 42, acronym: 'SD', name: 'South Dakota'},
      { id: 43, acronym: 'TN', name: 'Tennessee'},
      { id: 44, acronym: 'TX', name: 'Texas'},
      { id: 45, acronym: 'UT', name: 'Utah'},
      { id: 46, acronym: 'VT', name: 'Vermont'},
      { id: 47, acronym: 'VA', name: 'Virginia'},
      { id: 48, acronym: 'WA', name: 'Washington'},
      { id: 49, acronym: 'WV', name: 'West Virginia'},
      { id: 50, acronym: 'Wi', name: 'Wisconsin'},
      { id: 51, acronym: 'WY', name: 'Wyoming'}
    ];
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

  private sortBarChartItems(orderMode: number) {
    this.barItems = this.barItems.sort( function(item1: IBarChart, item2: IBarChart) {
      if (orderMode === 1 ) {
        return item1.id - item2.id;
      } else if (orderMode === 2) {
        return item1.value - item2.value;
      } else if (orderMode === 3) {
        return item2.value - item1.value;
      }
      return 0;
    });
  }
  onOptionChange(event: any) {
    console.log('onOptionClick ' +  event.option);
    this.sortBarChartItems(this.selectedSortOption);
  }
}
