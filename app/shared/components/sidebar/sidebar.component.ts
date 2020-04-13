import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  isActive = false;
  showMenu = '';
  lastUpdate = new Date('04/13/2020 11:03 AM');
  lastUpdateTooltip = 'Playground #9 FlexBox CSS adjustments';

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
