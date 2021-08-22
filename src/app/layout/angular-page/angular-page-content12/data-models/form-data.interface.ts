import { CategoryType } from "../category.enum";

export interface IFormData {
    hexId: string;
    category: CategoryType;
    currentDate: Date;
    description: string;
    comment?: string;
}

