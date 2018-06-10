import { ValidationPlaceKind } from './validation-place-kind';

export interface IComplexNameConfig {
    firstNameMinLength?: number;
    firstNameMaxLength?: number;
    isFirstNameMandatory: boolean;
    lastNameMinLength?: number;
    lastNameMaxLength?: number;
    isLastNameMandatory: boolean;
    isUpdateOnBlur: boolean;
    validationPlaceKind: ValidationPlaceKind;
}
