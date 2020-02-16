import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  isActive = false;
  showMenu = '';
  lastUpdate = new Date('02/16/2020 12:13 PM');
  lastUpdateTooltip = 'Turned on IVY next-generation compilation and rendering pipeline';

  ngOnInit() {
    this.lastUpdateTooltip = this.lastUpdateTooltip = 'Upgraded bootstrap and ng-bootstrap, Removed NgbModule.forRoot()';
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
