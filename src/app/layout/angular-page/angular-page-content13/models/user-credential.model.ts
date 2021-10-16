import { IUserCredential } from "./user-credential.interface";

export class UserCredential implements IUserCredential {
    credentialId: Uint8Array;    
    publicKey: Uint8Array;
}
