import { IAddress } from './address.interface';

export class AddressModel implements IAddress {
    addressLine1: string;
    addressLine2: string;
    city: string;
    zip: string;
    constructor(addrLine1?: string, addrLine2?: string, city?: string, zip?: string) {
        this.addressLine1 = addrLine1;
        this.addressLine2 = addrLine2;
        this.city = city;
        this.zip = zip;
    }
}
