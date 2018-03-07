import { Component, Input, OnInit } from '@angular/core';

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

  private dateDiffInDays(date1: Date, date2: Date): number {
    const oneday = 1000 * 60 * 60 * 24;
    const date1InMs = date1.getTime();
    const date2InMs = date2.getTime();
    const differenceInMs = date2InMs - date1InMs;
    return Math.round(differenceInMs / oneday);
  }

  private dateDiffInText(diffInDays: number): string {
    let diffText = '';
    const years = Math.trunc(diffInDays / 365);
    const remaindedMonths = diffInDays - (years * 365);
    const months = Math.trunc(remaindedMonths / 30);
    if (years === 0) {
      if (months > 0) {
        if (months > 1) {
          diffText = '' + months + ' months';
        } else {
          diffText = '' + months + ' month';
        }
      } else {
        diffText = '';
      }
    } else {
      if (years > 1) {
        diffText = '' + years + ' years ';
        if (months > 0) {
          if (months > 1) {
            diffText = diffText + months + ' months';
          } else {
            diffText = diffText + months + ' month';
          }
        } else {
          diffText += '';
        }
      } else {
        diffText = '' + years + ' year ';
        if (months > 0) {
          if (months > 1) {
            diffText = diffText + months + ' months';
          } else {
            diffText = diffText + months + ' month';
          }
        } else {
          diffText += '';
        }
      }
    }
    return diffText;
  }

  private dateDiff(date1: Date, date2: Date): string {
    let res = '';
    res = this.dateDiffInText(this.dateDiffInDays(date1, date2));
    return res;
  }
}
