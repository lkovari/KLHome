import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  pushRightClass = 'push-right';
  public years: number;

  constructor(public router: Router) {
    this.router.events.subscribe(val => {
      if (
          val instanceof NavigationEnd &&
          window.innerWidth <= 992 &&
          this.isToggled()
      ) {
          this.toggleSidebar();
      }
    });
   }

  ngOnInit() {
    const date = new Date();
    this.years = date.getFullYear() - 1983;
  }

  isToggled(): boolean {
    const dom: Element | null = document.querySelector('body');
    return dom ? dom.classList.contains(this.pushRightClass)  : false;
  }

  toggleSidebar() {
    const dom: any = document.querySelector('body');
    dom.classList.toggle(this.pushRightClass);
  }

  moveRltAndLtr() {
    const dom: any = document.querySelector('body');
    dom.classList.toggle('rtl');
  }

}
