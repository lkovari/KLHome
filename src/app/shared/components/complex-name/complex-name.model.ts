import { IComplexName } from './complex-name-interface';

export class ComplexName implements IComplexName {
    firstName: string | null;
    middleInitial: string | null;
    lastName: string | null;
    constructor(firstName: string | null = null, middleInitial: string | null = null, lastName: string | null = null) {
        this.firstName = firstName;
        this.middleInitial = middleInitial;
        this.lastName = lastName;
    }
}
