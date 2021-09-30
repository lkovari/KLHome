import { CategoryType } from "../category.enum";
import { IFormData } from "./form-data.interface";

export class FormDataModel implements IFormData {
    key: string;
    hexId: string;
    category: CategoryType;
    currentDate: string;
    description: string;
    comment?: string;
}
