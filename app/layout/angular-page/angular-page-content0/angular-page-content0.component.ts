import { Component, OnInit } from '@angular/core';
import * as angular from '@angular/forms';
import { AngularCourseModel } from '../../../shared/models/courses/angular-course.model';
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
  totalInProgressHours: string;
  private COL_COUNT_COMPLETED = 7;
  completedCourses$: Observable<AngularCourseModel[]>;
  inProgressCourses$: Observable<AngularCourseModel[]>;
  plannedCurses$: Observable<AngularCourseModel[]>;
  courses$: Observable<AngularCourseModel[]>;

  constructor(private fileLoaderService: FileLoaderService) { }

  ngOnInit() {
    this.githubLogoPath = 'assets/githubmark/GitHub-Mark-32px.png';
    this.angularVersion = angular.VERSION.full;
    console.log('Angular v' + this.angularVersion);
    this.initializeAngularCourses();
  }

  parseCourses(): Observable<AngularCourseModel[]>  {
    return this.csvFileLoaderParser('assets/courses', 'courses.csv');
  }

  private csvFileLoaderParser(path: string, fileName: string): Observable<AngularCourseModel[]> {
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
                courseModel.completed = (data[6] !== '0') ? +data[6] : 0;
                courses.push(courseModel);
              } else {
                return courses;
              }
            } else {
              console.log('No CSV Header!');
            }
          }
          courses.sort((course1: AngularCourseModel, course2: AngularCourseModel) => {
            return (course2.dateOfCompleted && course1.dateOfCompleted) ?
             course2.dateOfCompleted.getTime() - course1.dateOfCompleted.getTime() : 0;
          });
          let ix = courses.length;
          courses.forEach((course: AngularCourseModel) => {
            course.index = ix;
            ix = ix - 1;
          });
          let totalCompleted = this.collectingHours(courses, true);
          this.totalComplettedHours = totalCompleted.hours + 'h ' + Math.round(totalCompleted.minutes) + 'm';          
          totalCompleted = this.collectingHours(courses, false);
          this.totalInProgressHours = totalCompleted.hours + 'h ' + Math.round(totalCompleted.minutes) + 'm';          
          return courses;
        } else {
          return courses;
        }
      },
      (error: any) => console.error(`Cannot parse ${path} ${fileName} ${error}!`)
    ));
  }
  
  initializeAngularCourses() {
    this.courses$ = this.parseCourses();
    // filtering by completed of the course
    this.completedCourses$ = this.courses$.pipe(map(courses => courses.filter(course => course.completed === 100)));
    this.inProgressCourses$ = this.courses$.pipe(map(courses => courses.filter(course => course.completed > 0 && course.completed < 100)));
    this.plannedCurses$ = this.courses$.pipe(map(courses => courses.filter(course => course.completed === 0)));
  }

  extractSitetURL(course: AngularCourseModel): string {
    return course.website ? course.website : '';
  }

  /**
   *
   * @param courseList: Array<AngularCourseModel> -  list of courses
   */
  private collectingHours(courseList: AngularCourseModel[], onlyCompleted: boolean): IHourTuple {
    let totalMinutes = 0;
    courseList.forEach((course: AngularCourseModel) => {
      if (onlyCompleted && course.completed === 100) {
        let mins = course.hours * 60;
        mins = mins + course.minutes;
        totalMinutes = totalMinutes + mins;
      } else if (!onlyCompleted && (course.completed > 0 && course.completed < 100)) {
        let mins = course.hours * 60;
        mins = mins + course.minutes;
        mins = (mins / 100) * course.completed;
        totalMinutes = totalMinutes + mins;
      }
    });
    const totalTime = new HourTuple();
    totalTime.hours = Math.trunc(totalMinutes / 60);
    totalTime.minutes = totalMinutes - (totalTime.hours * 60);
    return totalTime;
  }

}
