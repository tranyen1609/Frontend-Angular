import { Error } from './error';

export class CountryData {
    countries: Country[];
    error: Error;
    constructor() {
    }
}

export class Country {
    id: number;
    name: string;
    constructor() {
    }
}