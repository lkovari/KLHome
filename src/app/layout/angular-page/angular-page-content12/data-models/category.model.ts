import { ICategory } from "./category.interface";

export class CategoryModel implements ICategory {
    label?: string;
    value: any;
    styleClass?: string;
    icon?: string;
    title?: string;
    disabled?: boolean;
    constructor(lbl: string, vlu: any, dis: boolean) {
        this.label = lbl;
        this.value = vlu;
        this.disabled = dis;
    }    
}
