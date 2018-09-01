import { Error } from './error';
import { Pagination } from './pagination'

export class UserData {
    users: User[];
    error: Error;
    pagination: Pagination;
}

export class User {
    
    constructor( 
        public id?: number,
        public name?: string,
        public password?: string,
        public address1?: number,
        public address2?: number,
    ) { }
}










