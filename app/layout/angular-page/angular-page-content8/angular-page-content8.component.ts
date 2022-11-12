import { AfterViewInit, Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Person } from '../../../shared/models/person.model';
import { ExamplePersonDataService } from '../../../shared/services/examplepersondata/example-person-data.service';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { Subscription } from 'rxjs';
import { AlertComponent } from 'src/app/shared/components/alert/alert.component';

@Component({
  selector: 'app-angular-page-content8',
  templateUrl: './angular-page-content8.component.html',
  styleUrls: ['./angular-page-content8.component.scss']
})
export class AngularPageContent8Component implements OnInit, AfterViewInit, OnDestroy {
  githubLogoPath: string;
  private closeSub: Subscription;
  personList: Array<Person>;
  useRouteResolver: boolean;
  @ViewChild(CdkVirtualScrollViewport, { static: true }) virtualScroll: CdkVirtualScrollViewport;
  @ViewChild("alertContainer", { read: ViewContainerRef }) alertContainer: ViewContainerRef;

  constructor(private route: ActivatedRoute,
             private examplePersonDataService: ExamplePersonDataService,
             private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    this.githubLogoPath = 'assets/githubmark/GitHub-Mark-32px.png';
    this.personList = [];
  }

  ngAfterViewInit(): void {
    // TODO !!!!!!! later I will fix with the right solution !!!!!!!
    setTimeout(() => {
      this.loadData();
    });
  }

  loadData() {
    this.useRouteResolver = this.examplePersonDataService.useRouteResolver;
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
      this.showErrorAlertBox(`ERROR!\n ${e.stack}`);
      throw e;
    }
  }

  onScrolltoTopClicked(event: MouseEvent): void {
    this.virtualScroll.scrollToIndex(0);
    console.log('onScrolltoTopClicked click event fired ' + event);
  }

  onScrolltoBottomClicked(event: MouseEvent): void {
    this.virtualScroll.scrollToIndex(100000);
    console.log('onScrolltoBottomClicked click event fired ' + event);
  }

  trackByFn(itemAny: any): number {
    const item = <Person>itemAny;
    return item.id;
  }

  private showErrorAlertBox(message: string) {
    const alertComponentFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    this.alertContainer.clear();
    const alertComponentRef = this.alertContainer.createComponent(alertComponentFactory);
    // pass parameter to the AlertComponent
    alertComponentRef.instance.message = message;
    this.closeSub = alertComponentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      this.alertContainer.clear();
    });
    // A13: const componentRef = this.alertLoader.viewContainerRef.createComponent(AlertComponent);
  }

  
  ngOnDestroy() {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }


}
