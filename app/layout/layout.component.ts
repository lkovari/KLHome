import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent, NavigationStart, GuardsCheckStart, GuardsCheckEnd,
         NavigationEnd, RouteConfigLoadStart, RouteConfigLoadEnd, RoutesRecognized,
         ActivationStart, ActivationEnd, ResolveStart, ResolveEnd, ChildActivationStart,
         ChildActivationEnd, NavigationError, NavigationCancel } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  enableWait = false;

  constructor(public router: Router) {
    this.router.events.subscribe((routerEvent: RouterEvent) => {
      this.handlingRouterEvent(routerEvent);
    });
  }

  private logMessage(where: string, routerEvent: RouterEvent | ChildActivationEnd | RouteConfigLoadEnd) {
    console.log(`RouterEvent ${where} : ${routerEvent}`);
  }

  handlingRouterEvent(routerEvent: RouterEvent) {
    if (routerEvent instanceof GuardsCheckStart) {
      const guardsCheckStart = <GuardsCheckStart>routerEvent;
      this.logMessage(`GuardsCheckStart`, guardsCheckStart);
    } else if (routerEvent instanceof GuardsCheckEnd) {
      const guardsCheckEnd = <GuardsCheckEnd>routerEvent;
      this.logMessage(`GuardsCheckEnd`, guardsCheckEnd);
    } else if (routerEvent instanceof NavigationStart) {
      const navigationStart = <NavigationStart>routerEvent;
      this.logMessage(`NavigationStart`, navigationStart);
      if (navigationStart.url === '/angular-page/angular-page-content8') {
        this.enableWait = true;
      }
      // start loading
    } else if (routerEvent instanceof NavigationEnd) {
      const navigationEnd = <NavigationEnd>routerEvent;
      this.logMessage(`NavigationEnd`, navigationEnd);
      if (navigationEnd.url === '/angular-page/angular-page-content8') {
          this.enableWait = false;
      }
      // finish loading
    } else if (routerEvent instanceof RouteConfigLoadStart) {
      const routeConfigLoadStart = <RouteConfigLoadStart>routerEvent;
      this.logMessage(`RouteConfigLoadStart`, routeConfigLoadStart);
    } else if (routerEvent instanceof RouteConfigLoadEnd) {
      const routeConfigLoadEnd = <RouteConfigLoadEnd>routerEvent;
      this.logMessage(`RouteConfigLoadEnd`, routeConfigLoadEnd);
    } else if (routerEvent instanceof RoutesRecognized) {
      const routesRecognized = <RoutesRecognized>routerEvent;
      this.logMessage(`RoutesRecognized`, routesRecognized);
    } else if (routerEvent instanceof GuardsCheckStart) {
      const guardsCheckStart = <GuardsCheckStart>routerEvent;
      this.logMessage(`GuardsCheckStart`, guardsCheckStart);
    } else if (routerEvent instanceof GuardsCheckEnd) {
      const guardsCheckEnd = <GuardsCheckEnd>routerEvent;
      this.logMessage(`GuardsCheckEnd`, guardsCheckEnd);
    } else if (routerEvent instanceof ActivationStart) {
      const activationStart = <ActivationStart>routerEvent;
      if (activationStart.snapshot.routeConfig && activationStart.snapshot.routeConfig.path) {
        this.logMessage(`ActivationStart`, activationStart);
      }
    } else if (routerEvent instanceof ActivationEnd) {
      const activationEnd = <ActivationEnd>routerEvent;
      if (activationEnd.snapshot.routeConfig && activationEnd.snapshot.routeConfig.path) {
        this.logMessage(`ActivationEnd`, activationEnd);
      }
    } else if (routerEvent instanceof ResolveStart) {
      const resolveStart = <ResolveStart>routerEvent;
      this.logMessage(`ResolveStart`, resolveStart);
    } else if (routerEvent instanceof ResolveEnd) {
      const resolveEnd = <ResolveEnd>routerEvent;
      this.logMessage(`ResolveEnd`, resolveEnd);
    } else if (routerEvent instanceof ChildActivationStart) {
      const childActivationStart = <ChildActivationStart>routerEvent;
      if (childActivationStart.snapshot.routeConfig && childActivationStart.snapshot.routeConfig.path) {
        this.logMessage(`ChildActivationStart`, childActivationStart);
      }
    } else if (routerEvent instanceof ChildActivationEnd) {
      const childActivationEnd = <ChildActivationEnd>routerEvent;
      if (childActivationEnd.snapshot.routeConfig && childActivationEnd.snapshot.routeConfig.path) {
        this.logMessage(`ChildActivationEnd`, childActivationEnd);
      }
    } else if (routerEvent instanceof NavigationError) {
      const navigationError = <NavigationError>routerEvent;
      this.logMessage(`NavigationError`, navigationError);
      // finish loading
      this.enableWait = false;
    } else if (routerEvent instanceof NavigationCancel) {
      const navigationCancel = <NavigationCancel>routerEvent;
      this.logMessage(`NavigationCancel`, navigationCancel);
      // finish loading
      this.enableWait = false;
    }
  }

  ngOnInit() {
    if (this.router.url === '/') {
      this.router.navigate(['/welcome-page']);
    }

  }

}
