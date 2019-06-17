import { IUser } from './user.interface';

export class User implements IUser {
    userName: string;
    email: string;
    phone: number
}
