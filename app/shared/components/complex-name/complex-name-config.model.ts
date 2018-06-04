import { IComplexNameConfig } from './complex-name-config.interface';

export class ComplexNameConfig implements IComplexNameConfig {
    firstNameMinLength?: number;
    firstNameMaxLength?: number;
    isFirstNameMandatory: boolean;
    lastNameMinLength?: number;
    lastNameMaxLength?: number;
    isLastNameMandatory: boolean;
    isShowTitle: boolean;
    isUpdateOnBlur: boolean;
}
