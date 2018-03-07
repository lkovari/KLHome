import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent implements OnInit {
  @Input() pageTitle: string;
  @Input() pageSubtitle: string;
  @Input() startTime: string;
  @Input() endTime: string;
  @Input() pageDescription: string;
  duration: string;
  startDate: Date;
  endDate: Date;

  constructor() { }

  ngOnInit() {
    this.startDate = new Date(this.startTime);
    this.endDate = this.endTime ? new Date(this.endTime) : new Date();
    this.duration = this.dateDiff(this.startDate, this.endDate);
  }

  private dateDiff(date1: Date, date2: Date): string {
    let res = '';
    let years = 0;
    let months = 0;

    const month1 = date1.getMonth() + 1;
    const month2 = date2.getMonth() + 1;
    const fullYear1 = date1.getFullYear();
    const fullYear2 = date2.getFullYear();
    let monthsAdd = 0;
    if (month1 === month2) {
      months = (fullYear2 - fullYear1) * 12;
    } else {
      if (fullYear1 === fullYear2) {
        if (month1 < month2) {
          monthsAdd = (month2 - month1);
        } else if (month1 > month2) {
          monthsAdd = ((12 - month1) + month2);
        }
      } else {
        months = ((fullYear2 - fullYear1)) * 12;
        if (month1 < month2) {
          monthsAdd = (month2 - month1);
        } else if (month1 > month2) {
          if (month1 === 12) {
            months = months - month1;
          }
          monthsAdd = ((12 - month1) + month2);
        }
      }
    }
    months += monthsAdd;
    months = months <= 0 ? 0 : months;
    if (months >= 12) {
      if ((months % 12) === 0) {
        years = months / 12;
        months = 0;
      } else {
        const monthsRemainder = months % 12;
        years = (months - (monthsRemainder % 12)) / 12;
        months = monthsRemainder;
      }
    }
    if (years === 0) {
      res = '' + months + ' month' + (months > 1 ? 's' : '');

    } else {
      if (months === 0) {
        res = '' + years + ' year' + (years > 1 ? 's' : '');
      } else {
        res = '' + years + ' year' + (years > 1 ? 's ' : ' ') + months + ' month' + (months > 1 ? 's' : '');
      }
    }
    return res;
  }
}
