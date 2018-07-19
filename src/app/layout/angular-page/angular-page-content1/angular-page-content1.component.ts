import { Component, OnInit } from '@angular/core';
import * as angular from '@angular/forms';
import { AngularCourseModel } from './angular-course.model';

@Component({
  selector: 'app-angular-page-content1',
  templateUrl: './angular-page-content1.component.html',
  styleUrls: ['./angular-page-content1.component.scss']
})
export class AngularPageContent1Component implements OnInit {
  angularCourseCompletedList: Array<AngularCourseModel>;
  angularCourseInProgressList: Array<AngularCourseModel>;
  angularCoursePlannedList: Array<AngularCourseModel>;

  fullImagePathRF: string;
  fullImagePathSCSS: string;
  fullImagePathSASS: string;
  fullImagePathA5: string;
  fullImagePathA5Rx: string;
  fullImagePrimeNg: string;
  fullImageAngularCompCommunication: string;
  fullImageAngularBestPractices: string;
  fullImageAngularRouter: string;
  fullImageAngularRouting: string;
  fullImageAngularAnimations: string;
  fullImageTypescriptFundamentalss: string;
  fullImagePathCSSPos: string;
  fullImageRxJs: string;
  angularVersion: any;
  courseTitles = [ 'Title', 'Author', 'Site', 'Completed', 'Certificate' ];

  constructor() { }

  ngOnInit() {
    this.angularVersion = angular.VERSION.full;
    this.initializeAngularCourses();
  }

  initializeAngularCourses() {
    const baseImageURL = 'assets/images/';
    this.angularCourseCompletedList = [
      { title: 'Angular Security Using JSON Web Tokens',  author: 'by Paul D. Sheriff', website: 'https://www.pluralsight.com/',
      dateOfCompleted: new Date('07/15/2018'), certificateImageSmall: baseImageURL + 'cert-asujwt-07152018.png',
      certificateImageLarge: baseImageURL + 'cert-asujwt-07152018.png' },

      { title: 'Date and Time Fundamentals',  author: 'by Matt Johnson', website: 'https://www.pluralsight.com/',
      dateOfCompleted: new Date('04/30/2018'), certificateImageSmall: baseImageURL + 'cert-dtf-04302018.png',
      certificateImageLarge: baseImageURL + 'cert-dtf-04302018.png' },

      { title: 'Angular Routing',  author: 'by Deborah Kurata', website: 'https://www.pluralsight.com/',
      dateOfCompleted: new Date('04/02/2018'), certificateImageSmall: baseImageURL + 'cert-ar-04022018.png',
      certificateImageLarge: baseImageURL + 'cert-ar-04022018.png' },

      { title: 'Angular Component Communication',  author: 'by Deborah Kurata', website: 'https://www.pluralsight.com',
      dateOfCompleted: new Date('03/07/2018'), certificateImageSmall: baseImageURL + 'cert-acc-03072018.png',
      certificateImageLarge: baseImageURL + 'cert-acc-03072018.png' },

      { title: 'Angular Best Practices',  author: 'by Jim Cooper', website: 'https://www.pluralsight.com/',
      dateOfCompleted: new Date('02/18/2018'), certificateImageSmall: baseImageURL + 'cert-abp-02182018.png',
      certificateImageLarge: baseImageURL + 'cert-abp-02182018.png' },

      { title: 'CSS Positioning',  author: 'by Susan Simkins', website: 'https://www.pluralsight.com/',
      dateOfCompleted: new Date('04/24/2018'), certificateImageSmall: baseImageURL + 'cert-cssp-04242018.png',
      certificateImageLarge: baseImageURL + 'cert-cssp-04242018.png' },

      { title: 'TypeScript Fundamentals',  author: 'by John Papa and Dan Wahlin', website: 'https://www.pluralsight.com/',
      dateOfCompleted: new Date('03/29/2018'), certificateImageSmall: baseImageURL + 'cert-tsf-03092018.png',
      certificateImageLarge: baseImageURL + 'cert-tsf-03092018.png' },

      { title: 'Working with Angular Animations',  author: 'by Gary Simon', website: 'https://www.pluralsight.com',
      dateOfCompleted: new Date('04/09/2018'), certificateImageSmall: baseImageURL + 'cert-wwaa-04092018.png',
      certificateImageLarge: baseImageURL + 'cert-wwaa-04092018.png' },

      { title: 'Building Beautiful Angular Apps with PrimeNG',  author: 'by Glen Smith', website: 'https://www.pluralsight.com',
      dateOfCompleted: new Date('01/31/2018'), certificateImageSmall: baseImageURL + 'cert-bbaawp-01312018.png',
      certificateImageLarge: baseImageURL + 'cert-bbaawp-01312018.png' },

      { title: 'Angular Reactive Forms',  author: 'by Deborah Kurata', website: 'https://www.pluralsight.com',
      dateOfCompleted: new Date('04/29/2017'), certificateImageSmall: baseImageURL + 'cert-arf-04292017.png',
      certificateImageLarge: baseImageURL + 'cert-arf-04292017.png' },

      { title: 'Angular 6 (formerly Angular 2) - The Complete Guide',  author: 'by Maximilian Schwarzmüller',
      website: 'https://www.udemy.com',  dateOfCompleted: new Date('01/08/2018'),
      certificateImageSmall: baseImageURL + 'cert-UC-9GVOGJGJ-01082018.png',
      certificateImageLarge: baseImageURL + 'cert-UC-9GVOGJGJ-01082018.png' },

      { title: 'Angular 2 Routing: Up And Running',  author: 'by BTree Press', website: 'https://www.udemy.com',
      dateOfCompleted: new Date('03/17/2018'), certificateImageSmall: baseImageURL + 'cert-UC-VI4V02BQ-03172018.png',
      certificateImageLarge: baseImageURL + 'cert-UC-VI4V02BQ-03172018.png' },

      { title: 'The Complete Sass & SCSS Course: From Beginner to Advance',  author: 'by Joe Parys', website: 'https://www.udemy.com',
      dateOfCompleted: new Date('12/17/2017'), certificateImageSmall: baseImageURL + 'cert-UC-NLUM4IQ0-12172017.png',
      certificateImageLarge: baseImageURL + 'cert-UC-NLUM4IQ0-12172017.png' },

      { title: 'Bootstrap 4 Quick Start: Code Modern Responsive Website',  author: 'by Brad Hussey', website: 'https://www.udemy.com',
      dateOfCompleted: new Date('04/06/2017'), certificateImageSmall: baseImageURL + 'cert-UC-XRLSVCSR-04062017.png',
      certificateImageLarge: baseImageURL + 'cert-UC-XRLSVCSR-04062017.png' }
    ];

    this.angularCourseInProgressList =  [
      { title: 'Angular RxJs Reactive Programming & FREE Ebook',  author: 'by Vasco Ferreira', website: 'https://www.udemy.com',
      dateOfCompleted: null, certificateImageSmall: '',
      certificateImageLarge: null },

      { title: 'Angular HTTP Communication',  author: 'by Brice Wilson', website: 'https://www.pluralsight.com',
      dateOfCompleted: null, certificateImageSmall: '',
      certificateImageLarge: null },

      { title: 'Blockchain – Principles and Practices',  author: 'by Stephen Haunts', website: 'https://www.pluralsight.com',
      dateOfCompleted: null, certificateImageSmall: '',
      certificateImageLarge: null },

      { title: 'Getting Started with Reactive Programming Using RxJS',  author: 'by Scott Allen', website: 'https://www.pluralsight.com',
      dateOfCompleted: null, certificateImageSmall: '',
      certificateImageLarge: null }
    ];

    this.angularCoursePlannedList =  [
      { title: 'Redux Fundamentals',  author: 'by Jamis Charles', website: 'https://www.pluralsight.com',
      dateOfCompleted: null, certificateImageSmall: '',
      certificateImageLarge: null },

      { title: 'Using Redux to Manage State in Angular',  author: 'by Hendrik Swanepoel', website: 'https://www.pluralsight.com',
      dateOfCompleted: null, certificateImageSmall: '',
      certificateImageLarge: null },

      { title: 'Advanced Redux',  author: 'by Daniel Stern', website: 'https://www.pluralsight.com',
      dateOfCompleted: null, certificateImageSmall: '',
      certificateImageLarge: null },

      { title: 'Building Web Applications with Node.js and Express 4.0',
      author: 'by onathan Mills', website: 'https://www.pluralsight.com',
      dateOfCompleted: null, certificateImageSmall: '',
      certificateImageLarge: null },

      { title: 'TypeScript In-depth',  author: 'by Brice Wilson', website: 'https://www.pluralsight.com',
      dateOfCompleted: null, certificateImageSmall: '',
      certificateImageLarge: null },

      { title: 'Building a Web App with ASP.NET Core, MVC, Entity Framework Core, Bootstrap, and Angular',
      author: 'by Shawn Wildermuth', website: 'https://www.pluralsight.com',
      dateOfCompleted: null, certificateImageSmall: '',
      certificateImageLarge: null },

      { title: 'Integrating Angular with ASP.NET Core RESTful Services',  author: 'by Dan Wahlin', website: 'https://www.pluralsight.com',
      dateOfCompleted: null, certificateImageSmall: '',
      certificateImageLarge: null },

      { title: 'Angular 2+ with Typescript - Essential Training',  author: 'by Patrick Schroeder ', website: 'https://www.udemy.com',
      dateOfCompleted: null, certificateImageSmall: '',
      certificateImageLarge: null },

      { title: 'React and Redux Masterclass',  author: 'by Mateusz Grzesiukiewicz', website: 'https://www.udemy.com',
      dateOfCompleted: null, certificateImageSmall: '',
      certificateImageLarge: null },

      { title: 'Redux Fundamentals',  author: 'by Jamis Charles', website: 'https://www.pluralsight.com',
      dateOfCompleted: null, certificateImageSmall: '',
      certificateImageLarge: null }
    ];

    this.angularCourseCompletedList.sort((course1: AngularCourseModel, course2: AngularCourseModel) => {
      return course2.dateOfCompleted.getTime() - course1.dateOfCompleted.getTime();
    });
  }

  extractCertURL(course: AngularCourseModel): string {
    return course.certificateImageSmall ? course.certificateImageSmall : '';
  }

  extractSitetURL(course: AngularCourseModel): string {
    return course.website ? course.website : '';
  }

}
