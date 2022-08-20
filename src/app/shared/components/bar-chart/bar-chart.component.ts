import { Component, OnInit, Input } from '@angular/core';
import { IBarChart } from '../../models/bar-chart/bar-chart-item.interface';
import { BarChartOrientation } from '../../models/bar-chart/bar-chart-orientation.enum';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {
  private previousOrientation: BarChartOrientation = BarChartOrientation.BOTTOM_TO_TOP;
  @Input() fixHeightInRem = 30;
  @Input() barItems: IBarChart[];
  @Input() barChartOrientation;
  private _orientation: BarChartOrientation;
  @Input()
  set orientation(v: BarChartOrientation) {
    console.log('set Orientation ' +  BarChartOrientation[v]);
    if (this._orientation !== v) {
      this.previousOrientation = this._orientation;
      this._orientation = v;
    }
  }
  get orientation(): BarChartOrientation {
    return this._orientation;
  }

  constructor() { }

  ngOnInit(): void {
    this.barChartOrientation = BarChartOrientation.BOTTOM_TO_TOP;
  }

  private findMaxValue(barItems: IBarChart[]): number {
    return Math.max.apply(Math, barItems.map(function(item: IBarChart) {
      return item.value;
    }))
  }

  calculateBarLength(value: number): string {
    // let res = '' + this.fixHeightInRem + 'rem';
    let res = '100%';
    const maxValue = this.findMaxValue(this.barItems);
    let currentHeight = ((this.fixHeightInRem / maxValue) * value);
    currentHeight = Math.round(currentHeight * 10) / 10;
    // res = '' + currentHeight + 'rem';
    res =  '' + ((100 / this.fixHeightInRem) * currentHeight) + '%';
    return res;
  }

  private orientation2OrientationClass(orientation: BarChartOrientation): string {
    let orientationClass = '';
    switch (orientation) {
      case BarChartOrientation.BOTTOM_TO_TOP: {
        orientationClass = 'bar-chart-container-bottom-to-top';
        break;
      }
      case BarChartOrientation.TOP_TO_BOTTOM: {
        orientationClass = 'bar-chart-container-top-to-bottom';
        break;
      }
      case BarChartOrientation.LEFT_TO_RIGHT: {
        orientationClass = 'bar-chart-container-left-to-right';
        break;
      }
      case BarChartOrientation.RIGHT_TO_LEFT: {
        orientationClass = 'bar-chart-container-right-to-left';
        break;
      }
    }
    return orientationClass;
  }

  modifyOrientation(): string {
    let res = this.orientation2OrientationClass(this.previousOrientation);
    if (this.previousOrientation !== this._orientation) {
      res = this.orientation2OrientationClass(this._orientation);
      // console.log('modify Orientation to ' + res);
    }
    return res;
  }

  calculateBarHeight(value: number): string {
    let res = '';
    if (this._orientation === BarChartOrientation.BOTTOM_TO_TOP || this._orientation === BarChartOrientation.TOP_TO_BOTTOM) {
      res = this.calculateBarLength(value);
    } else if (this._orientation === BarChartOrientation.LEFT_TO_RIGHT || this._orientation === BarChartOrientation.RIGHT_TO_LEFT) {
      res = '10%';
    }
    return res;
  }

  calculateBarWidth(value: number): string {
    let res = '';
    if (this._orientation === BarChartOrientation.BOTTOM_TO_TOP || this._orientation === BarChartOrientation.TOP_TO_BOTTOM) {
      res = '9%';
    } else if (this._orientation === BarChartOrientation.LEFT_TO_RIGHT || this._orientation === BarChartOrientation.RIGHT_TO_LEFT) {
      res = this.calculateBarLength(value);
    }
    return res;
  }

  calculateLightenOrDarkenColor(color: string, modifier: number) {
    let usePound = false;
    if (color[0] === '#') {
      color = color.slice(1);
        usePound = true;
    }
    const num = parseInt(color, 16);
    // tslint:disable-next-line:no-bitwise
    let r = num >> 16;
    r = r + modifier;

    if (r > 255) {
      r = 255;
    } else if  (r < 0) {
      r = 0;
    }
    // tslint:disable-next-line:no-bitwise
    let b = ((num >> 8) & 0x00FF)
    b = b + modifier;

    if (b > 255) {
      b = 255;
    } else if  (b < 0) {
      b = 0;
    }
    // tslint:disable-next-line:no-bitwise
    let g = (num & 0x0000FF);
    g = g  + modifier;

    if (g > 255) {
      g = 255;
    } else if (g < 0) {
      g = 0;
    }
    // tslint:disable-next-line:no-bitwise
    return (usePound ? '#' : '') + (g | (b << 8) | (r << 16)).toString(16);
  }

  trackByFn(itemAny: any): number {
    const item = <IBarChart>itemAny;
    return item.id;
  }

  composeBarContent(bar: IBarChart): string {
    return bar.label + ' ' + bar.value + 'Y';
  }
}
