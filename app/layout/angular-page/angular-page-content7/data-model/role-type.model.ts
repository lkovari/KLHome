import { IRoleType } from './role-type.interface';

export class RoleTypeModel implements IRoleType {
    label?: string;
    value: any;
    disabled = false;
    constructor(lbl: string, vlu: any, dis: boolean) {
        this.label = lbl;
        this.value = vlu;
        this.disabled = dis;
    }
}
