import { Component, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Person } from 'app/shared/models/person.model';
import { ExamplePersonDataService } from 'app/shared/services/examplepersondata/example-person-data.service';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-angular-page-content8',
  templateUrl: './angular-page-content8.component.html',
  styleUrls: ['./angular-page-content8.component.scss']
})
export class AngularPageContent8Component implements OnInit {
  githubLogoPath: string;
  personList: Array<Person>;
  useRouteResolver: boolean;
  @ViewChild(CdkVirtualScrollViewport, { static: true }) virtualScroll: CdkVirtualScrollViewport;

  constructor(private route: ActivatedRoute,
             private examplePersonDataService: ExamplePersonDataService) { }

  ngOnInit() {
    this.useRouteResolver = this.examplePersonDataService.useRouteResolver;
    this.personList = [];
    this.githubLogoPath = 'assets/githubmark/GitHub-Mark-32px.png';
    if (this.useRouteResolver) {
      this.personList = this.route.snapshot.data['resolvedPersonData'];
      console.log(`RESOLVE: AngularPageContent8Component : #${this.personList.length} Person rows captured from route data.`);
      this.examplePersonDataService.useRouteResolver = false;
    } else {
      const t0 = performance.now();
      this.examplePersonDataService.loadtExamplePersonData().subscribe((personArray: Array<Person>) => {
        if (personArray) {
          Object.assign(this.personList, personArray);
          const elapsed = performance.now() - t0;
          console.log(`LOAD: AngularPageContent8Component : #${this.personList.length} Person
            rows captured from route data. Elapsed ${elapsed}`);
        }
        this.examplePersonDataService.useRouteResolver = true;
      });
    }
    try {
      const ix = this.personList.length - 1;
      console.log(`RESOLVED:
      Id:${this.personList[ix].id},
      First name: ${this.personList[ix].firstName},
      Last Name: ${this.personList[ix].lastName}`);
    } catch (e) {
      window.alert(`ERROR!\n ${e.stack}`);
      throw e;
    }
  }

  onScrolltoTopClicked(event): void {
    this.virtualScroll.scrollToIndex(0);
  }

  onScrolltoBottomClicked(event): void {
    this.virtualScroll.scrollToIndex(100000);
  }

  trackByFn(item: Person) {
    return item.id;
  }
}
