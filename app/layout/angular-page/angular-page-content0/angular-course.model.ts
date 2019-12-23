import { IAngularCourse } from './angular-course.interface';

export class AngularCourseModel implements IAngularCourse {
    index: number;
    title: string;
    author: string;
    website: string;
    dateOfCompleted: Date;
    certificateImageSmall: string;
    certificateImageLarge: string;
    hours: number;
    minutes: number;
}
