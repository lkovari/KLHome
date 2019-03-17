import { IModuleType } from './module-type.interface';

export class ModuleTypeModel implements IModuleType {
    label?: string;
    value: any;
    disabled = false;
    constructor(lbl: string, vlu: any, dis: boolean) {
        this.label = lbl;
        this.value = vlu;
        this.disabled = dis;
    }
}
