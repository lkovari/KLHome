import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public years: number;

  constructor() { }

  ngOnInit() {
    const date = new Date();
    this.years = date.getFullYear() - 1983;
  }

  toggleSidebar() {
    const dom: any = document.querySelector('body');
    dom.classList.toggle('push-right');
  }


  moveRltAndLtr() {
    const dom: any = document.querySelector('body');
    dom.classList.toggle('rtl');
  }

  navitemAClick() {
    alert('Nav Item A Clicked!');
  }

  navitemBClick() {
    alert('Nav Item B Clicked!');
  }

  navitemCClick() {
    alert('Nav Item C Clicked!');
  }

}
