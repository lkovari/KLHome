import { IAngularCourse } from './angular-course.interface';

export class AngularCourseModel implements IAngularCourse {
    title: string;
    author: string;
    website: string;
    dateOfCompleted: Date;
    certificateImageSmall: string;
    certificateImageLarge: string;
}
