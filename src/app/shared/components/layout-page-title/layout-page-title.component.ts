import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout-page-title',
  templateUrl: './layout-page-title.component.html',
  styleUrls: ['./layout-page-title.component.scss']
})
export class LayoutPageTitleComponent implements OnInit {
  @Input() pageTitle: string;
  @Input() pageSubtitle: string;
  @Input() startTime: string;
  @Input() endTime: string;
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

    months = (date2.getFullYear() - date1.getFullYear()) * 12;
    months -= date1.getMonth() + 1;
    months += date2.getMonth();
    months = months <= 0 ? 0 : months;
    if (months > 12) {
      years = months % 12;
      months = (months - (years * 12));
    }
    res = '' + years + ' year ' + (years > 1 ? 's' : '') + months + ' month' + (months > 1 ? 's' : '');
    return res;
  }

}