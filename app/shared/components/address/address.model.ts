import { IAddress } from './address.interface';

export class AddressModel implements IAddress {
    addressLine1: string | null;
    addressLine2: string | null;
    city: string | null;
    zip: string | null;
    // constructor(addrLine1: string, addrLine2: string, city: string, zip: string) {
    // prevent An argument for 'addrLine1' was not provided.
    constructor(addrLine1: string | null = null, addrLine2: string | null = null, city: string | null = null, zip: string | null = null) {
        this.addressLine1 = addrLine1;
        this.addressLine2 = addrLine2;
        this.city = city;
        this.zip = zip;
    }
}
