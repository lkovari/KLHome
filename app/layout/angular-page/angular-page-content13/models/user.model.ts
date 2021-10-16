import { IUserCredential } from "./user-credential.interface";
import { IUser } from "./user.interface";

export class User implements IUser {
    id?: string;
    email: string;
    password: string;
    credentials: IUserCredential[]; 
}
