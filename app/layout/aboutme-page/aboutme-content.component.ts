import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aboutme-content',
  templateUrl: './aboutme-content.component.html',
  styleUrls: ['./aboutme-content.component.scss']
})
export class AboutmeContentComponent implements OnInit {
  public years: number;
  public fullImagePath: string;
  public fullInsightImagePath: string;
  public fullInsightImagePathHref: string;
  constructor() {
    this.fullImagePath = 'assets/images/lk_img_s.jpg';
    this.fullInsightImagePath = 'assets/images/lk_insightprofilebricks.jpg';
    this.fullInsightImagePathHref = 'assets/bigfiles/LaszloKovari-InsightsDiscoveryPersonalProfile.pdf';
  }
  ngOnInit() {
    const date = new Date();
    this.years = date.getFullYear();
  }
}
