import { Component, OnInit } from '@angular/core';
import * as angular from '@angular/forms';
import { AngularCourseModel } from './angular-course.model';
import { core } from '@angular/compiler';
import { IHourTuple } from './hour-tuple.interface';
import { HourTuple } from './hour-tuple.model';
import { FileLoaderService } from 'app/shared/services/fileloader/file-loader.service';

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
  courseTitles = ['Title', 'Author', 'Site', 'Completed', 'Certificate'];
  totalComplettedHours: string;

  constructor(private fileLoaderService: FileLoaderService) { }

  ngOnInit() {
    this.angularVersion = angular.VERSION.full;
    this.initializeAngularCourses();
  }

  private csvLoaderParser(path: string, fileName: string, courses: Array<AngularCourseModel>) {
    this.fileLoaderService.loadtTextFile(path, fileName, false).subscribe((txt: string) => {
      if (txt) {
        console.log('LOADED ' + fileName + ' - ' + JSON.stringify(txt));
        const textLines = txt.split(/\r|\n/);
        console.log('textLines ' + fileName + ' - ' + JSON.stringify(textLines));
        const csvHeader = textLines[0].split(',');
        console.log('csvHeader ' + fileName + ' - ' + JSON.stringify(csvHeader));
        let isCompleted = false;
        for (let ix = 1; ix < textLines.length; ix++) {
          // split content based on comma
          const data = textLines[ix].split(',');
          console.log('length ' + fileName + ' - ' + JSON.stringify(data[0]));
          if (data.length === 7 && data.length === csvHeader.length) {
            data[0] = data[0].replace('↵', '');
            console.log('data ' + fileName + ' - ' + JSON.stringify(data[0]));
            const courseModel = new AngularCourseModel();
            courseModel.title = data[0];
            courseModel.author = data[1];
            courseModel.website = data[2];
            courseModel.dateOfCompleted = (data[3] !== 'null') ? new Date(data[3]) : null;
            if (courseModel.dateOfCompleted) {
              isCompleted = true;
            }
            courseModel.certificateImageLarge = (data[4] !== 'null') ? 'assets/images/' + data[4] : null;
            courseModel.certificateImageSmall = (data[4] !== 'null') ? 'assets/images/' + data[4] : null;
            courseModel.hours = (data[5] !== '0') ? +data[5] : 0;
            courseModel.minutes = (data[6] !== '0') ? +data[6] : 0;
            courses.push(courseModel);
          } else {
            console.log('Length not equals ' + fileName + ' d ' + data.length + ' h ' + csvHeader.length + ' : ' + data[0]);
          }
        }
        console.log('PARSED ' + fileName + ' - ' + courses.length + ' : ' + JSON.stringify(courses));
        if (isCompleted) {
          this.angularCourseCompletedList.sort((course1: AngularCourseModel, course2: AngularCourseModel) => {
            return course2.dateOfCompleted.getTime() - course1.dateOfCompleted.getTime();
          });
          this.calculateTotalHours();
        }
      }
    });
  }


  initializeAngularCourses() {
    this.angularCourseCompletedList = [];
    this.csvLoaderParser('assets/courses', 'completed-courses.csv', this.angularCourseCompletedList);
    this.angularCourseInProgressList = [];
    this.csvLoaderParser('assets/courses', 'inprogress-courses.csv', this.angularCourseInProgressList);

    this.angularCoursePlannedList = []
    this.csvLoaderParser('assets/courses', 'planned-courses.csv', this.angularCoursePlannedList);
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
