import { Component, Input, OnInit } from '@angular/core';
import { AngularCourseModel } from 'src/app/shared/models/courses/angular-course.model';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {
  @Input() course: AngularCourseModel;
  
  constructor() { }

  ngOnInit(): void {
  }

}
