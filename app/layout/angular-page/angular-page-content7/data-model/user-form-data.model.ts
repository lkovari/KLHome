import { IUserFormData } from './user-form-data.interface';
import { UserRole } from './user-role.model';

export class UserFormData implements IUserFormData {
    userName: string;
    password: string;
    confirmPassword: string;
    userRoles: Array<UserRole>;
}
