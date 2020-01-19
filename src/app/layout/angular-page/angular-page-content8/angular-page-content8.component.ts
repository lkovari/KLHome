import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Person } from 'app/shared/models/person.model';
import { ExamplePersonDataService } from 'app/shared/services/examplepersondata/example-person-data.service';
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
  useRouteResolver: boolean;

  constructor(private route: ActivatedRoute, private examplePersonDataService: ExamplePersonDataService) { }

  ngOnInit() {
    this.useRouteResolver = this.examplePersonDataService.useRouteResolver;
    this.personList = [];
    this.githubLogoPath = 'assets/githubmark/GitHub-Mark-32px.png';
    if (this.useRouteResolver) {
      this.personList = this.route.snapshot.data['resolvedPersonData'];
      console.log(`RESOLVE: AngularPageContent8Component : #${this.personList.length} Person rows captured from route data.`);
      this.examplePersonDataService.useRouteResolver = false;
    } else {
      this.examplePersonDataService.loadtExamplePersonData().subscribe((personArray: Array<Person>) => {
        if (personArray) {
          Object.assign(this.personList, personArray);
          console.log(`LOAD: AngularPageContent8Component : #${this.personList.length} Person rows captured from route data.`);
        }
        this.examplePersonDataService.useRouteResolver = true;
      });
    }
    try {
      console.log(`RESOLVED:
      Id:${this.personList[9999].id},
      First name: ${this.personList[9999].firstName},
      Last Name: ${this.personList[9999].lastName}`);
    } catch (e) {
      window.alert(`ERROR!\n ${e.stack}`);
      throw e;
    }
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

  trackByFn(item: Person) {
    return item.id;
  }
}
