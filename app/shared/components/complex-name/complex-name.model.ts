import { IComplexName } from './complex-name-interface';

export class ComplexName implements IComplexName {
    first: string;
    middle?: string;
    last: string;
    title?: string;
}
