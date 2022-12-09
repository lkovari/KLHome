/**
 * Created by Laszlo Kovary on 4/13/2017.
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PersonDataResolver } from 'src/app/shared/services/persondataresolver/person-data-resolver.service';
import { AngularPageContent0Component } from './angular-page-content0/angular-page-content0.component';
import { AngularPageContent1Component } from './angular-page-content1/angular-page-content1.component';
import { AngularPageContent10Component } from './angular-page-content10/angular-page-content10.component';
import { AngularPageContent11Component } from './angular-page-content11/angular-page-content11.component';
import { AngularPageContent12Component } from './angular-page-content12/angular-page-content12.component';
import { AngularPageContent13Component } from './angular-page-content13/angular-page-content13.component';
import { AngularPageContent14Component } from './angular-page-content14/angular-page-content14.component';
import { AngularPageContent15Component } from './angular-page-content15/angular-page-content15.component';
import { AbstractFactoryPatternComponent } from './angular-page-content16/abstract-factory-pattern/abstract-factory-pattern.component';
import { AdapterPatternComponent } from './angular-page-content16/adapter-pattern/adapter-pattern.component';
import { AngularPageContent16Component } from './angular-page-content16/angular-page-content16.component';
import { BridgePatternComponent } from './angular-page-content16/bridge-pattern/bridge-pattern.component';
import { BuilderPatternComponent } from './angular-page-content16/builder-pattern/builder-pattern.component';
import { ChainOfResponsibilityPatternComponent } from './angular-page-content16/chain-of-responsibility-pattern/chain-of-responsibility-pattern.component';
import { CommandPatternComponent } from './angular-page-content16/command-pattern/command-pattern.component';
import { DecoratorPatternComponent } from './angular-page-content16/decorator-pattern/decorator-pattern.component';
import { FacadePatternComponent } from './angular-page-content16/facade-pattern/facade-pattern.component';
import { FactoryPatternComponent } from './angular-page-content16/factory-pattern/factory-pattern.component';
import { FlyweightPatternComponent } from './angular-page-content16/flyweight-pattern/flyweight-pattern.component';
import { InterpreterPatternComponent } from './angular-page-content16/interpreter-pattern/interpreter-pattern.component';
import { MediatorPatternComponent } from './angular-page-content16/mediator-pattern/mediator-pattern.component';
import { MementoPatternComponent } from './angular-page-content16/memento-pattern/memento-pattern.component';
import { ObserverPatternComponent } from './angular-page-content16/observer-pattern/observer-pattern.component';
import { PrototypePatternComponent } from './angular-page-content16/prototype-pattern/prototype-pattern.component';
import { ProxyPatternComponent } from './angular-page-content16/proxy-pattern/proxy-pattern.component';
import { SingletonPatternComponent } from './angular-page-content16/singleton-pattern/singleton-pattern.component';
import { SolidPrinciplesComponent } from './angular-page-content16/solid-principles/solid-principles.component';
import { StatePatternComponent } from './angular-page-content16/state-pattern/state-pattern.component';
import { StrategyPatternComponent } from './angular-page-content16/strategy-pattern/strategy-pattern.component';
import { TemplateMethodPatternComponent } from './angular-page-content16/template-method-pattern/template-method-pattern.component';
import { VisitorPatternComponent } from './angular-page-content16/visitor-pattern/visitor-pattern.component';
import { AngularPageContent1rComponent } from './angular-page-content1r/angular-page-content1r.component';
import { AngularPageContent2Component } from './angular-page-content2/angular-page-content2.component';
import { AngularPageContent3Component } from './angular-page-content3/angular-page-content3.component';
import { AngularPageContent4Component } from './angular-page-content4/angular-page-content4.component';
import { AngularPageContent5Component } from './angular-page-content5/angular-page-content5.component';
import { AngularPageContent6Component } from './angular-page-content6/angular-page-content6.component';
import { AngularPageContent7Component } from './angular-page-content7/angular-page-content7.component';
import { AngularPageContent8Component } from './angular-page-content8/angular-page-content8.component';
import { AngularPageContent9Component } from './angular-page-content9/angular-page-content9.component';

import { AngularPageTitleComponent } from './angular-page-title.component';

const routes: Routes = [
  { path: '', component: AngularPageTitleComponent, 
  children: [
    // !!!!!!! Should be use loadChildren for lazy load
    // !!!!!!! Dynamically should be fill router array
    {path: 'angular-page-content0', component: AngularPageContent0Component},
    {path: 'angular-page-content1', component: AngularPageContent1Component},
    {path: 'angular-page-content1r', component: AngularPageContent1rComponent},
    {path: 'angular-page-content2', component: AngularPageContent2Component},
    {path: 'angular-page-content3', component: AngularPageContent3Component},
    {path: 'angular-page-content4', component: AngularPageContent4Component},
    {path: 'angular-page-content5', component: AngularPageContent5Component},
    {path: 'angular-page-content6', component: AngularPageContent6Component},
    {path: 'angular-page-content7', component: AngularPageContent7Component},
    {path: 'angular-page-content8', component: AngularPageContent8Component, resolve: { resolvedPersonData: PersonDataResolver }},
    {path: 'angular-page-content9', component: AngularPageContent9Component},
    {path: 'angular-page-content10', component: AngularPageContent10Component},
    {path: 'angular-page-content11', component: AngularPageContent11Component},
    {path: 'angular-page-content12', component: AngularPageContent12Component},
    {path: 'angular-page-content13', component: AngularPageContent13Component},
    {path: 'angular-page-content14', component: AngularPageContent14Component},
    {path: 'angular-page-content15', component: AngularPageContent15Component},
    {path: 'angular-page-content16', component: AngularPageContent16Component},
    {path: 'angular-page-content16', component: AngularPageContent16Component,
    children: [
      { path: 'factory', component: FactoryPatternComponent, outlet: 'patterns' },
      { path: 'abstractfactory', component: AbstractFactoryPatternComponent, outlet: 'patterns' },
      { path: 'builder', component: BuilderPatternComponent, outlet: 'patterns' },
      { path: 'prototype', component: PrototypePatternComponent, outlet: 'patterns' },
      { path: 'singleton', component: SingletonPatternComponent, outlet: 'patterns' },
    
      { path: 'decorator', component: DecoratorPatternComponent, outlet: 'patterns' },
      { path: 'adapter', component: AdapterPatternComponent, outlet: 'patterns' },
      { path: 'facade', component: FacadePatternComponent, outlet: 'patterns' },
      { path: 'bridge', component: BridgePatternComponent, outlet: 'patterns' },
      { path: 'composite', component: AdapterPatternComponent, outlet: 'patterns' },
      { path: 'flyweight', component: FlyweightPatternComponent, outlet: 'patterns' },
      { path: 'proxy', component: ProxyPatternComponent, outlet: 'patterns' },
    
      { path: 'command', component: CommandPatternComponent, outlet: 'patterns' },
      { path: 'chainofresponsibility', component: ChainOfResponsibilityPatternComponent, outlet: 'patterns' },
      { path: 'observer', component: ObserverPatternComponent, outlet: 'patterns' },
      { path: 'interpreter', component: InterpreterPatternComponent, outlet: 'patterns' },
      { path: 'mediator', component: MediatorPatternComponent, outlet: 'patterns' },
      { path: 'memento', component: MementoPatternComponent, outlet: 'patterns' },
      { path: 'state', component: StatePatternComponent, outlet: 'patterns' },
      { path: 'strategy', component: StrategyPatternComponent, outlet: 'patterns' },
      { path: 'templatemethod', component: TemplateMethodPatternComponent, outlet: 'patterns' },
      { path: 'visitor', component: VisitorPatternComponent, outlet: 'patterns' },

      { path: 'singleresponsibility/:solidPrincipleKind', component: SolidPrinciplesComponent, outlet: 'patterns' },
      { path: 'openclose/:solidPrincipleKind', component: SolidPrinciplesComponent, outlet: 'patterns' },
      { path: 'liskovsubstitution/:solidPrincipleKind', component: SolidPrinciplesComponent, outlet: 'patterns' },
      { path: 'interfacesegregation/:solidPrincipleKind', component: SolidPrinciplesComponent, outlet: 'patterns' },
      { path: 'dependencyinversion/:solidPrincipleKind', component: SolidPrinciplesComponent, outlet: 'patterns' }
    ]
  }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AngularPageRoutingModule { }
