export interface IAngularCourse {
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
