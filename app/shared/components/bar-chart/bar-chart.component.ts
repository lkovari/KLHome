import { Component, OnInit, Input } from '@angular/core';
import { IBarChart } from '../../models/bar-chart/bar-chart-item.interface';
import { BarChartOrientation } from '../../models/bar-chart/bar-chart-orientation.enum';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {
  @Input() fixHeightInRem = 30;
  @Input() barItems: IBarChart[];
  @Input() barChartOrientation = BarChartOrientation.BOTTOM_TO_TOP;

  constructor() { }

  ngOnInit(): void {
  }

  private findMaxValue(barItems: IBarChart[]): number {
    return Math.max.apply(Math, barItems.map(function(item: IBarChart) {
      return item.value;
    }))
  }

  calculateHeight(value: number): string {
    // let res = '' + this.fixHeightInRem + 'rem';
    let res = '100%';
    const maxValue = this.findMaxValue(this.barItems);
    let currentHeight = ((this.fixHeightInRem / maxValue) * value);
    currentHeight = Math.round(currentHeight * 10) / 10;
    // res = '' + currentHeight + 'rem';
    res =  '' + ((100 / this.fixHeightInRem) * currentHeight) + '%';
    return res;
  }

  decideOrientation(bar: IBarChart): boolean {
    return bar.value > 5 && bar.label.length > 8;
  }
}
