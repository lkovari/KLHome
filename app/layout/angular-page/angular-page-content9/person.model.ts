import { USState } from 'src/app/shared/models/usstate/us-state';

export class Person {
    firstName: string;
    middleInitial: string;
    lastName: string;
    email: string;
    street: string;
    city: string;
    state: USState;
    zip: string;
}
