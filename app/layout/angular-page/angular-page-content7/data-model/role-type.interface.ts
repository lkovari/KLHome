import { SelectItem } from 'primeng/primeng';

export interface IRoleType extends SelectItem {
    label?: string;
    value: any;
    styleClass?: string;
    icon?: string;
    title?: string;
    disabled?: boolean;
}
