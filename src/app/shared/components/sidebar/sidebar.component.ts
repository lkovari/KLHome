import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  isActive = false;
  showMenu = '';
  lastUpdate = new Date('06/9/2024 6:47 AM');
  lastUpdateTooltip = 'About page style, added vertical scroll';

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
