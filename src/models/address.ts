import { Error } from './error';
import { User } from './user'

export class AddressData {
    address: Address[];
    error: Error;
    constructor() {
    }
}

export class UserAddress {
    user: User;
    addresses: Address[];
    constructor( u: User, a: Array<Address> ){
        this.user = u;
        this.addresses = a;
    }
}

export class Address {
    id: number;
    addressTypeId: number;
    countryId: number;
    cityId: number;
    districtId: number;
    street: string;
    constructor(addresstypeid?: number, countryid?: number, cityid?: number, districtid?: number, st?: string) {
        this.addressTypeId = addresstypeid;
        this.countryId = countryid;
        this.cityId = cityid;
        this.districtId = districtid;
        this.street = st;
    }
}


export class UserAddressesDetail {
    user: User;
    addresses: Array<AddressDetail>;
}
export class AddressDetail {
    id: number;
    street: string;
    addressType: string;
    district: string;
    city: string;
    country: string;
}