import { ValidationPlaceKind } from './validation-place-kind';

export interface IComplexNameConfig {
    firstNameMinLength: number | null;
    firstNameMaxLength: number | null;
    isFirstNameMandatory: boolean;
    lastNameMinLength: number | null;
    lastNameMaxLength: number | null;
    isLastNameMandatory: boolean;
    isUpdateOnBlur: boolean;
    isShowDoneInside: boolean;
    validationPlaceKind: ValidationPlaceKind;
}
