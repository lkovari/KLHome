import { Component, OnInit } from '@angular/core';
//import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-awards-content',
  templateUrl: './awards-content.component.html',
  styleUrls: ['./awards-content.component.scss']
})
export class AwardsContentComponent implements OnInit {
  public years: number;
  imagePath1: string;

  constructor(/*private metaService: Meta*/) { }

  ngOnInit() {
    this.imagePath1 = "assets/images/2022Q4CaughtAtYourBestbig.png";
    // this.metaService.addTag( { name: "viewport", content: "width=device-width, initial-scale=1" } );
    const date = new Date();
    this.years = date.getFullYear();
  }

}
