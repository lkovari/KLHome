import { Component, OnInit } from '@angular/core';
import * as angular from '@angular/forms';
import { AngularCourseModel } from './angular-course.model';
// import { IHourTuple } from './hour-tuple.interface';
// import { HourTuple } from './hour-tuple.model';
import { FileLoaderService } from '../../../shared/services/fileloader/file-loader.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IHourTuple } from './hour-tuple.interface';
import { HourTuple } from './hour-tuple.model';

@Component({
  selector: 'app-angular-page-content0',
  templateUrl: './angular-page-content0.component.html',
  styleUrls: ['./angular-page-content0.component.scss']
})
export class AngularPageContent0Component implements OnInit {
  githubLogoPath: string;
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
  // courseTitles = ['Title', 'Author', 'Site', 'Completed', 'Certificate'];
  totalComplettedHours: string;
  private COL_COUNT_COMPLETED = 6;
  completedCourses$: Observable<AngularCourseModel[]>;
  inProgressCourses$: Observable<AngularCourseModel[]>;
  plannedCurses$: Observable<AngularCourseModel[]>;

  constructor(private fileLoaderService: FileLoaderService) { }

  ngOnInit() {
    this.githubLogoPath = 'assets/githubmark/GitHub-Mark-32px.png';
    this.angularVersion = angular.VERSION.full;
    console.log('Angular v' + this.angularVersion);
    this.initializeAngularCourses();
  }

  parseCompletedCourses(): Observable<AngularCourseModel[]>  {
    return this.csvFileLoaderParser('assets/courses', 'completed-courses.csv', true);
  }

  parseCoursesInProgress(): Observable<AngularCourseModel[]>  {
    return this.csvFileLoaderParser('assets/courses', 'inprogress-courses.csv', false);
  }

  parseCoursesPlanned(): Observable<AngularCourseModel[]> {
    return this.csvFileLoaderParser('assets/courses', 'planned-courses.csv', false);
  }

  private csvFileLoaderParser(path: string, fileName: string, isCollectTotal: boolean): Observable<AngularCourseModel[]> {
    return this.fileLoaderService.loadtTextFile(path, fileName, false).pipe(
      map(txt => {
        let courses = new Array<AngularCourseModel>();
        if (txt) {
          let textLines = txt.split(/\r|\n/);
          textLines = textLines.filter(x => x.trim() !== '');
          const csvHeader = textLines[0].split(',');
          for (let ix = 1; ix < textLines.length; ix++) {
            // split content based on comma
            const data = textLines[ix].split(',');
            if (data[0].trim() !== '') {
              if (data.length === this.COL_COUNT_COMPLETED && data.length === csvHeader.length) {
                data[0] = data[0].replace('↵', '');
                const courseModel = new AngularCourseModel();
                courseModel.title = data[0];
                courseModel.author = data[1];
                courseModel.website = data[2];
                courseModel.dateOfCompleted = (data[3] !== 'null') ? new Date(data[3]) : null;
                courseModel.hours = (data[4] !== '0') ? +data[4] : 0;
                courseModel.minutes = (data[5] !== '0') ? +data[5] : 0;
                courses.push(courseModel);
              } else {
                return courses;
              }
            } else {
              console.log('No CSV Header!');
            }
          }
          if (isCollectTotal) {
            courses.sort((course1: AngularCourseModel, course2: AngularCourseModel) => {
              return (course2.dateOfCompleted && course1.dateOfCompleted) ?
               course2.dateOfCompleted.getTime() - course1.dateOfCompleted.getTime() : 0;
            });
            let ix = courses.length;
            courses.forEach((course: AngularCourseModel) => {
              course.index = ix;
              ix = ix - 1;
            });
            const totalCompleted = this.collectingHours(courses);
            this.totalComplettedHours = totalCompleted.hours + 'h ' + totalCompleted.minutes + 'm';          
          }
          return courses;
        } else {
          return courses;
        }
      },
      (error: any) => console.error(`Cannot parse ${path} ${fileName} ${error}!`)
    ));
  }
  
  initializeAngularCourses() {
    this.completedCourses$ = this.parseCompletedCourses();
    this.inProgressCourses$ = this.parseCoursesInProgress();
    this.plannedCurses$ = this.parseCoursesPlanned();
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

}
