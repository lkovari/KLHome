# KLHome

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.5.0. 12/30/2017

My first Angular app (formerly Angular 2, 4, 5, 6, 7, 8, ...11), I used a template for built it. At first I just simply put my previous site content which is absolutelly not the best practice. I will rewrite it, as soon as I have enough time for it(like as kovariLAB). Similar as I did with the "Angular 2 ~ 2017" page. Currently I use dis website as my personal website and also an Angular playground.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class/module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Known Problem

DEPRECATED: The 'defaultProject' workspace option has been deprecated. The project to use will be determined from the current working directory.

## Former Problems

1. 2022-11-19 when run the production build 
    Warning: C:\src\Angular\pilot\KLHome\node_modules\ng2-pdf-viewer\fesm2015\ng2-pdf-viewer.mjs depends on 'pdfjs-dist/build/pdf'. CommonJS or AMD dependencies can cause optimization bailouts. For more info see: https://angular.io/guide/build#configuring-commonjs-dependencies
   Fix:
   Added to angular.json the proper common js dependencies
               "allowedCommonJsDependencies": 
            [
							"ng2-pdf-viewer",
							"pdfjs-dist/build/pdf",
							"pdfjs-dist/web/pdf_viewer"              
            ]


