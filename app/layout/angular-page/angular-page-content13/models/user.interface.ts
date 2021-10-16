import { IUserCredential } from "./user-credential.interface";

export interface IUser {
    id?: string;
    email: string;
    password: string;
    credentials: IUserCredential[]; 
}
