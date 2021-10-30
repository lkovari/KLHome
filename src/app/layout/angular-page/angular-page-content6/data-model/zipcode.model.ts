import { IZipCode } from "./zipcode.interface";

export class ZipCode implements IZipCode {
    city: string;
    county: string;
    id: number;
    state: string;
    zipCode: number;    
}