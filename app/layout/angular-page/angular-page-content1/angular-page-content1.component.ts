import { Component, OnInit } from '@angular/core';
import * as angular from '@angular/forms';
import { AngularCourseModel } from './angular-course.model';
import { core } from '@angular/compiler';
import { IHourTuple } from './hour-tuple.interface';
import { HourTuple } from './hour-tuple.model';

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
  totalComplettedHours: string;

  constructor() { }

  ngOnInit() {
    this.angularVersion = angular.VERSION.full;
    this.initializeAngularCourses();
    this.calculateTotalHours();
  }

  initializeAngularCourses() {
    const baseImageURL = 'assets/images/';
    this.angularCourseCompletedList = [
      { title: 'Constructing a User Interface with Angular',  author: 'by David Mann', website: 'https://www.pluralsight.com/',
      dateOfCompleted: new Date('05/04/2019'), certificateImageSmall: baseImageURL + 'cert-constructing-ui-with-angular.png',
      certificateImageLarge: baseImageURL + 'cert-constructing-ui-with-angular.png', hours: 4, minutes: 35 },

      { title: 'Styling Angular Applications',  author: 'by Brian Treese', website: 'https://www.pluralsight.com/',
      dateOfCompleted: new Date('05/05/2019'), certificateImageSmall: baseImageURL + 'cert-styling-angular-app.png',
      certificateImageLarge: baseImageURL + 'cert-styling-angular-app.png', hours: 1, minutes: 54 },

      { title: 'JavaScript: Getting Started',  author: 'by Mark Zamoyta', website: 'https://www.pluralsight.com/',
      dateOfCompleted: new Date('03/30/2019'), certificateImageSmall: baseImageURL + 'cert-styling-angular-app.png',
      certificateImageLarge: baseImageURL + 'cert-styling-angular-app.png', hours: 2, minutes: 46 },

      { title: 'JavaScript: Getting Started',  author: 'by Mark Zamoyta', website: 'https://www.pluralsight.com/',
      dateOfCompleted: new Date('05/05/2019'), certificateImageSmall: baseImageURL + 'cert-javascript-gettingstarted.png',
      certificateImageLarge: baseImageURL + 'cert-javascript-gettingstarted.png', hours: 2, minutes: 46 },

      { title: 'Angular Forms',  author: 'by Mark Zamoyta', website: 'https://www.pluralsight.com/',
      dateOfCompleted: new Date('04/29/2019'), certificateImageSmall: baseImageURL + 'cert-angular-forms.png',
      certificateImageLarge: baseImageURL + 'cert-angular-forms.png', hours: 2, minutes: 3 },

      { title: 'Structuring Angular Applications with Angular Libraries',  author: 'by Fabian Gosebrink',
      website: 'https://www.pluralsight.com/', dateOfCompleted: new Date('04/23/2019'),
      certificateImageSmall: baseImageURL + 'cert-struct-angular-app-with-angular-libs.png',
      certificateImageLarge: baseImageURL + 'cert-struct-angular-app-with-angular-libs.png', hours: 2, minutes: 3 },

      { title: 'Play by Play: Angular and ngrx',  author: 'by Lars Klint and Duncan Hunter', website: 'https://www.pluralsight.com/',
      dateOfCompleted: new Date('04/22/2019'), certificateImageSmall: baseImageURL + 'cert-pbp-angular-anrc.png',
      certificateImageLarge: baseImageURL + 'cert-pbp-angular-anrc.png', hours: 1, minutes: 39 },

      { title: 'Angular Architecture and Best Practices',  author: 'by Dan Wahlin', website: 'https://www.pluralsight.com/',
      dateOfCompleted: new Date('04/21/2019'), certificateImageSmall: baseImageURL + 'cert-angular-architecvture-and-best-practices.png',
      certificateImageLarge: baseImageURL + 'cert-angular-architecvture-and-best-practices.png', hours: 5, minutes: 22 },

      { title: 'Play by Play: Insights from the Angular Team',  author: 'by Stephen Fluin and John Papa',
      website: 'https://www.pluralsight.com/', dateOfCompleted: new Date('03/31/2019'),
      certificateImageSmall: baseImageURL + 'cert-insights-from-angular.png',
      certificateImageLarge: baseImageURL + 'cert-insights-from-angular.png', hours: 1, minutes: 19 },

      { title: 'ASP.NET Core Fundamentals',  author: 'by Scott Allen', website: 'https://www.udemy.com',
      dateOfCompleted: new Date('03/26/2019'), certificateImageSmall: baseImageURL + 'cert-aspdnet-core-fundamentals.png',
      certificateImageLarge: baseImageURL + 'cert-aspdnet-core-fundamentals.png', hours: 5, minutes: 49 },

      { title: 'Angular HTTP Communication',  author: 'by Brice Wilson', website: 'https://www.pluralsight.com',
      dateOfCompleted: new Date('03/26/2019'), certificateImageSmall: baseImageURL + 'cert-angular-http-communication.png',
      certificateImageLarge: baseImageURL + 'cert-angular-http-communication.png', hours: 2, minutes: 26 },

      { title: 'LINQ Fundamentals with C# 6.0',  author: 'by Scott Allen', website: 'https://www.pluralsight.com',
      dateOfCompleted: new Date('03/25/2019'), certificateImageSmall: baseImageURL + 'cert-linq-fundamentals.png',
      certificateImageLarge: baseImageURL + 'cert-linq-fundamentals.png', hours: 4, minutes: 23 },

      { title: 'C# Fundamentals with Visual Studio 2015',  author: 'by Scott Alen', website: 'https://www.pluralsight.com/',
      dateOfCompleted: new Date('01/24/2019'), certificateImageSmall: baseImageURL + 'cert-csharpfundvs2015-4127.png',
      certificateImageLarge: baseImageURL + 'cert-csharpfundvs2015-4127.png', hours: 5, minutes: 21 },

      { title: 'C# 6 from Scratch',  author: '', website: 'https://www.pluralsight.com/',
      dateOfCompleted: new Date('12/05/2018'), certificateImageSmall: baseImageURL + 'cert-csharp6-from-scratch.png',
      certificateImageLarge: baseImageURL + 'cert-csharp6-from-scratch.png', hours: 3, minutes: 7 },

      { title: 'C# Generics',  author: 'by Scott Alen', website: 'https://www.pluralsight.com/',
      dateOfCompleted: new Date('01/20/2019'), certificateImageSmall: baseImageURL + 'cert-csharpgen-4127.png',
      certificateImageLarge: baseImageURL + 'cert-csharpgen-4127.png', hours: 4, minutes: 20 },

      { title: 'C# Best Practices: Improving on the Basics',  author: 'by Deborah Kurata', website: 'https://www.pluralsight.com/',
      dateOfCompleted: new Date('01/07/2019'), certificateImageSmall: baseImageURL + 'cert-csharpbp-impr-4127.png',
      certificateImageLarge: baseImageURL + 'cert-csharpbp-impr-4127.png', hours: 4, minutes: 50 },

      { title: 'C# Best Practices: Collections and Generics',  author: 'by Deborah Kurata', website: 'https://www.pluralsight.com/',
      dateOfCompleted: new Date('01/03/2019'), certificateImageSmall: baseImageURL + 'cert-csharpbp-collgen-4127.png',
      certificateImageLarge: baseImageURL + 'cert-csharpbp-collgen-4127.png', hours: 3, minutes: 35 },

      { title: 'C#6 from scratch ',  author: 'by Jesse Liberty', website: 'https://www.pluralsight.com/',
      dateOfCompleted: new Date('07/15/2018'), certificateImageSmall: baseImageURL + 'cert-csharp6scratch-4127.png',
      certificateImageLarge: baseImageURL + 'cert-csharp6scratch-4127.png', hours: 3, minutes: 7 },

      { title: 'Angular Security Using JSON Web Tokens',  author: 'by Paul D. Sheriff', website: 'https://www.pluralsight.com/',
      dateOfCompleted: new Date('06/12/2018'), certificateImageSmall: baseImageURL + 'cert-asujwt-07152018.png',
      certificateImageLarge: baseImageURL + 'cert-asujwt-07152018.png', hours: 2, minutes: 50 },

      { title: 'Date and Time Fundamentals',  author: 'by Matt Johnson', website: 'https://www.pluralsight.com/',
      dateOfCompleted: new Date('04/30/2018'), certificateImageSmall: baseImageURL + 'cert-dtf-04302018.png',
      certificateImageLarge: baseImageURL + 'cert-dtf-04302018.png', hours: 6, minutes: 19 },

      { title: 'Angular Routing',  author: 'by Deborah Kurata', website: 'https://www.pluralsight.com/',
      dateOfCompleted: new Date('04/02/2018'), certificateImageSmall: baseImageURL + 'cert-ar-04022018.png',
      certificateImageLarge: baseImageURL + 'cert-ar-04022018.png', hours: 4, minutes: 48 },

      { title: 'Angular Component Communication',  author: 'by Deborah Kurata', website: 'https://www.pluralsight.com',
      dateOfCompleted: new Date('03/07/2018'), certificateImageSmall: baseImageURL + 'cert-acc-03072018.png',
      certificateImageLarge: baseImageURL + 'cert-acc-03072018.png', hours: 3, minutes: 39 },

      { title: 'Angular Best Practices',  author: 'by Jim Cooper', website: 'https://www.pluralsight.com/',
      dateOfCompleted: new Date('02/18/2018'), certificateImageSmall: baseImageURL + 'cert-abp-02182018.png',
      certificateImageLarge: baseImageURL + 'cert-abp-02182018.png', hours: 1, minutes: 41 },

      { title: 'CSS Positioning',  author: 'by Susan Simkins', website: 'https://www.pluralsight.com/',
      dateOfCompleted: new Date('04/24/2018'), certificateImageSmall: baseImageURL + 'cert-cssp-04242018.png',
      certificateImageLarge: baseImageURL + 'cert-cssp-04242018.png', hours: 0, minutes: 50 },

      { title: 'TypeScript Fundamentals',  author: 'by John Papa and Dan Wahlin', website: 'https://www.pluralsight.com/',
      dateOfCompleted: new Date('03/29/2018'), certificateImageSmall: baseImageURL + 'cert-tsf-03092018.png',
      certificateImageLarge: baseImageURL + 'cert-tsf-03092018.png', hours: 4, minutes: 25 },

      { title: 'Working with Angular Animations',  author: 'by Gary Simon', website: 'https://www.pluralsight.com',
      dateOfCompleted: new Date('04/09/2018'), certificateImageSmall: baseImageURL + 'cert-wwaa-04092018.png',
      certificateImageLarge: baseImageURL + 'cert-wwaa-04092018.png', hours: 1, minutes: 27 },

      { title: 'Building Beautiful Angular Apps with PrimeNG',  author: 'by Glen Smith', website: 'https://www.pluralsight.com',
      dateOfCompleted: new Date('01/31/2018'), certificateImageSmall: baseImageURL + 'cert-bbaawp-01312018.png',
      certificateImageLarge: baseImageURL + 'cert-bbaawp-01312018.png', hours: 3, minutes: 8 },

      { title: 'Angular Reactive Forms',  author: 'by Deborah Kurata', website: 'https://www.pluralsight.com',
      dateOfCompleted: new Date('04/29/2017'), certificateImageSmall: baseImageURL + 'cert-arf-04292017.png',
      certificateImageLarge: baseImageURL + 'cert-arf-04292017.png', hours: 3, minutes: 52 },

      { title: 'Angular 6 (formerly Angular 2) - The Complete Guide',  author: 'by Maximilian Schwarzmüller',
      website: 'https://www.udemy.com',  dateOfCompleted: new Date('01/08/2018'),
      certificateImageSmall: baseImageURL + 'cert-UC-9GVOGJGJ-01082018.png',
      certificateImageLarge: baseImageURL + 'cert-UC-9GVOGJGJ-01082018.png', hours: 27, minutes: 0  },

      { title: 'Angular 2 Routing: Up And Running',  author: 'by BTree Press', website: 'https://www.udemy.com',
      dateOfCompleted: new Date('03/17/2018'), certificateImageSmall: baseImageURL + 'cert-UC-VI4V02BQ-03172018.png',
      certificateImageLarge: baseImageURL + 'cert-UC-VI4V02BQ-03172018.png', hours: 0, minutes: 42 },

      { title: 'The Complete Sass & SCSS Course: From Beginner to Advance',  author: 'by Joe Parys', website: 'https://www.udemy.com',
      dateOfCompleted: new Date('12/30/2017'), certificateImageSmall: baseImageURL + 'cert-UC-NLUM4IQ0-12172017.png',
      certificateImageLarge: baseImageURL + 'cert-UC-NLUM4IQ0-12172017.png', hours: 4, minutes: 0 },

      { title: 'Bootstrap 4 Quick Start: Code Modern Responsive Website',  author: 'by Brad Hussey', website: 'https://www.udemy.com',
      dateOfCompleted: new Date('04/06/2017'), certificateImageSmall: baseImageURL + 'cert-UC-XRLSVCSR-04062017.png',
      certificateImageLarge: baseImageURL + 'cert-UC-XRLSVCSR-04062017.png', hours: 4, minutes: 0 }
    ];

    this.angularCourseInProgressList =  [
      { title: 'C# Tips and Traps',  author: 'by Jason Roberts', website: 'https://www.pluralsight.com',
      dateOfCompleted: null, certificateImageSmall: '',
      certificateImageLarge: null, hours: 3, minutes: 57 },

      { title: 'C# Tips and Traps 2',  author: 'by Jason Roberts', website: 'https://www.pluralsight.com',
      dateOfCompleted: null, certificateImageSmall: '',
      certificateImageLarge: null, hours: 2, minutes: 43 },

      { title: 'Angular RxJs Reactive Programming & FREE Ebook',  author: 'by Vasco Ferreira', website: 'https://www.udemy.com',
      dateOfCompleted: null, certificateImageSmall: '',
      certificateImageLarge: null, hours: 7, minutes: 30 },

      { title: 'Blockchain – Principles and Practices',  author: 'by Stephen Haunts', website: 'https://www.pluralsight.com',
      dateOfCompleted: null, certificateImageSmall: '',
      certificateImageLarge: null, hours: 2, minutes: 41 },

      { title: 'Getting Started with Reactive Programming Using RxJS',  author: 'by Scott Allen', website: 'https://www.pluralsight.com',
      dateOfCompleted: null, certificateImageSmall: '',
      certificateImageLarge: null, hours: 1, minutes: 52 }
    ];

    this.angularCoursePlannedList =  [
      { title: 'Building a RESTful API with ASP.NET core',  author: 'by Kevin Dockx', website: 'https://www.pluralsight.com',
      dateOfCompleted: null, certificateImageSmall: '',
      certificateImageLarge: null, hours: 8, minutes: 10 },


      { title: 'Entity Framework Core: Getting Started',  author: 'by Julie Lerman', website: 'https://www.pluralsight.com',
      dateOfCompleted: null, certificateImageSmall: '',
      certificateImageLarge: null, hours: 5, minutes: 52 },

      { title: 'ASP.NET Core: Using Entity Framework and Working with User Data',  author: 'by Eric Fisher',
      website: 'https://www.pluralsight.com',
      dateOfCompleted: null, certificateImageSmall: '',
      certificateImageLarge: null, hours: 1, minutes: 50 },

      { title: 'Redux Fundamentals',  author: 'by Jamis Charles', website: 'https://www.pluralsight.com',
      dateOfCompleted: null, certificateImageSmall: '',
      certificateImageLarge: null, hours: 3, minutes: 26 },

      { title: 'Using Redux to Manage State in Angular',  author: 'by Hendrik Swanepoel', website: 'https://www.pluralsight.com',
      dateOfCompleted: null, certificateImageSmall: '',
      certificateImageLarge: null, hours: 1, minutes: 21 },

      { title: 'Advanced Redux',  author: 'by Daniel Stern', website: 'https://www.pluralsight.com',
      dateOfCompleted: null, certificateImageSmall: '',
      certificateImageLarge: null, hours: 2, minutes: 55 },

      { title: 'Building Web Applications with Node.js and Express 4.0',
      author: 'by onathan Mills', website: 'https://www.pluralsight.com',
      dateOfCompleted: null, certificateImageSmall: '',
      certificateImageLarge: null, hours: 0, minutes: 0 },

      { title: 'TypeScript In-depth',  author: 'by Brice Wilson', website: 'https://www.pluralsight.com',
      dateOfCompleted: null, certificateImageSmall: '',
      certificateImageLarge: null, hours: 4, minutes: 40 },

      { title: 'Building a Web App with ASP.NET Core, MVC, Entity Framework Core, Bootstrap, and Angular',
      author: 'by Shawn Wildermuth', website: 'https://www.pluralsight.com',
      dateOfCompleted: null, certificateImageSmall: '',
      certificateImageLarge: null, hours: 9, minutes: 58 },

      { title: 'Integrating Angular with ASP.NET Core RESTful Services',  author: 'by Dan Wahlin', website: 'https://www.pluralsight.com',
      dateOfCompleted: null, certificateImageSmall: '',
      certificateImageLarge: null, hours: 5, minutes: 49 },

      { title: 'Angular 2+ with Typescript - Essential Training',  author: 'by Patrick Schroeder ', website: 'https://www.udemy.com',
      dateOfCompleted: null, certificateImageSmall: '',
      certificateImageLarge: null, hours: 3, minutes: 0 },

      { title: 'React and Redux Masterclass',  author: 'by Mateusz Grzesiukiewicz', website: 'https://www.udemy.com',
      dateOfCompleted: null, certificateImageSmall: '',
      certificateImageLarge: null, hours: 16, minutes: 0 },

      { title: 'Redux Fundamentals',  author: 'by Jamis Charles', website: 'https://www.pluralsight.com',
      dateOfCompleted: null, certificateImageSmall: '',
      certificateImageLarge: null, hours: 3, minutes: 26 }
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

  /**
   *
   * @param courseList: Array<AngularCourseModel> -  list of courses
   */
  private collectingHours(courseList: Array<AngularCourseModel>): IHourTuple {
    let totalMinutes = 0;
    courseList.forEach((course: AngularCourseModel) => {
      let mins = course.hours * 60;
      mins = mins + course.minutes;
      totalMinutes = totalMinutes + mins;
    });
    const totalTime = new HourTuple();
    totalTime.hours = Math.trunc(totalMinutes / 60);
    totalTime.minutes = totalMinutes - (totalTime.hours * 60);
    return totalTime;
  }

  private calculateTotalHours() {
    const totalCompleted = this.collectingHours(this.angularCourseCompletedList);
    this.totalComplettedHours = totalCompleted.hours + 'h ' + totalCompleted.minutes + 'm';
  }
}
