import { RoleType } from '../role-type.enum';
import { ModuleType } from '../module-type.enum';
import { IUserRole } from './user-role.interface';

export class UserRole implements IUserRole {
    roleType: RoleType;
    moduleType: ModuleType;
    description: string;
    expire: Date;
    amount: number;
}
