import { IAngularCourse } from './angular-course.interface';

export class AngularCourseModel implements IAngularCourse {
    index: number;
    title: string;
    author: string;
    website: string;
    dateOfCompleted: Date | null;
    certificateImageSmall: string | null;
    certificateImageLarge: string | null;
    hours: number;
    minutes: number;
}
