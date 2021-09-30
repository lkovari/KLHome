import { CategoryType } from "../category.enum";

export interface IFormData {
    key: string;
    hexId: string;
    category: CategoryType;
    currentDate: string;
    description: string;
    comment?: string;
}

