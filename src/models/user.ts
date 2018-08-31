import { Error } from './error';
import { Pagination } from './pagination'

export class UserData {
    users: User[];
    error: Error;
    pagination: Pagination;
}

export class User {
    id: number;
    name: string;
    password: string;
    address1: number;
    address2: number;
    constructor( name: string = "", password: string = "") {
        this.name = name;
        this.password = password;
    }
}










