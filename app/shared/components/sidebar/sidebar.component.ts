import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  isActive = false;
  showMenu = '';
  lastUpdate = new Date('02/17/2021 09:05 PM');
  lastUpdateTooltip = 'Update to Angular 11, PrimeNG 11 etc.';

  ngOnInit() {
    this.lastUpdateTooltip = this.lastUpdateTooltip + '';
  }

  eventCalled() {
    this.isActive = !this.isActive;
  }

  addExpandClass(element: any) {
    if (element === this.showMenu) {
      this.showMenu = '0';
    } else {
      this.showMenu = element;
    }
  }
}
