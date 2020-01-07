import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Person } from 'app/shared/models/person.model';
import { PerfectScrollbarConfigInterface, PerfectScrollbarComponent } from 'ngx-perfect-scrollbar';

@Component({
  selector: 'app-angular-page-content8',
  templateUrl: './angular-page-content8.component.html',
  styleUrls: ['./angular-page-content8.component.scss']
})
export class AngularPageContent8Component implements OnInit {
  githubLogoPath: string;
  personList: Array<Person>;
  config: PerfectScrollbarConfigInterface = {};
  @ViewChild(PerfectScrollbarComponent, { static: false }) componentRef?: PerfectScrollbarComponent;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.personList = [];
    this.githubLogoPath = 'assets/githubmark/GitHub-Mark-32px.png';
    this.personList = this.route.snapshot.data['resolvedPersonData'];
    console.log(`AngularPageContent8Component : # of Person row loaded ${this.personList.length}`);
  }

  onScrolltoTopClicked(event): void {
    if (this.componentRef && this.componentRef.directiveRef) {
      this.componentRef.directiveRef.scrollToTop();
    }
  }

  onScrolltoBottomClicked(event): void {
    if (this.componentRef && this.componentRef.directiveRef) {
      this.componentRef.directiveRef.scrollToBottom();
    }
  }
}
