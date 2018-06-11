import { IComplexName } from './complex-name-interface';

export class ComplexName implements IComplexName {
    firstName: string;
    middleInitial?: string;
    lastName: string;
    constructor(firstName?: string, middleInitial?: string, lastName?: string) {
        this.firstName = firstName;
        this.middleInitial = middleInitial;
        this.lastName = lastName;
    }
}
