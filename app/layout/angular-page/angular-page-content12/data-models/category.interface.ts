import { SelectItem } from "primeng/api/selectitem";

export interface ICategory extends SelectItem {
    label?: string;
    value: any;
    styleClass?: string;
    icon?: string;
    title?: string;
    disabled?: boolean;
}
