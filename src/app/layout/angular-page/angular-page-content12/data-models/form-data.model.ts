import { CategoryType } from "../category.enum";
import { IFormData } from "./form-data.interface";

export class FormDataModel implements IFormData {
    hexId: string;
    category: CategoryType;
    currentDate: Date;
    description: string;
    comment?: string;
}
