import { RoleType } from '../role-type.enum';
import { ModuleType } from '../module-type.enum';

export interface IUserRole {
    roleType: RoleType;
    moduleType: ModuleType;
    description: string;
    expire: Date;
}
