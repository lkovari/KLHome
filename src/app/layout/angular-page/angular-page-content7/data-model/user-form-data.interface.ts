import { UserRole } from './user-role.model';

export interface IUserFormData {
    userName: string;
    password: string;
    confirmPassword: string;
    userRoles: Array<UserRole>;
}
