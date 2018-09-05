import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { User, UserData } from '../../models/user';
import { UserAddress, Address, UserAddressesDetail } from '../../models/address';
import { error } from '@angular/compiler/src/util';
import { CountryData } from '../../models/country';
import { CityData } from '../../models/city';
import { DistrictData } from '../../models/district';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private apiRoot = 'http://localhost:5000/api/';
  // private apiRoot = 'https://ubunsys.net/one/api/';

  private apiCountries = this.apiRoot + 'countries';
  private apiCitiesOfCountryId = this.apiRoot + 'cities/country';
  private apiDistrictsOfCityId = this.apiRoot + 'districts/city';
  private apiUserAddresses = this.apiRoot + 'addresses';
  private apiAddressType = this.apiRoot + 'addresstypes'
  
  constructor( private http: HttpClient ) { }

  getUserAddresses(size: number, current: number) {
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      })
    };
    let url = `${this.apiUserAddresses}/page?size=${size}&current=${current}`;
    return this.http.get(url);
  }
  checkValiToken() {
    let options = {
      headers: new HttpHeaders( { 
        'Authorization': 'Bearer '+ localStorage.getItem("token") 
      } )};
    return this.http.get(this.apiCountries, options);
  }

  createUserAddress (u: User, a: Array<Address>) {
    let useradd: UserAddress = new UserAddress( u, a );
    let options = {headers: new HttpHeaders( { 'Content-Type': 'application/json', 'Authorization': 'Bearer '+ localStorage.getItem("token") } )};
    return this.http.post(this.apiUserAddresses, useradd, options).pipe(
      // map ( Response => JSON.stringify(Response) ),
      catchError(error) );
  }

  getUserAddressesOfUserId(id: number): Observable<UserAddressesDetail[]> {
    const url= `${this.apiUserAddresses}/user/${id}`;
    return this.http.get<UserAddressesDetail[]>(url).pipe(
      catchError(
        err => {
          console.log("error of getUserAddressesFromId(id): " + err)
          return of(err);
        }
      )
    );
  }

  AgetAddressFromId(id: number) {
    const url = `${this.apiUserAddresses}/${id}`;
    return this.http.get(url).pipe(
      catchError(
        err => {
          console.log("error of AgetAddressFromId(): " + err);
          return of(err);
        }
      )
    )
  }

  AgetAddressTypes() {
    const url = `${this.apiAddressType}`;
    return this.http.get(url).pipe(
      catchError(
        err => {
          console.log("error of AgetAddressType(): " + err);
          return of(err);
        }
      )
    );
  }

  AgetCountries() {
    return this.http.get(this.apiCountries).pipe(
      catchError(
        err => {
          console.log("error of AgetCountries(): " + err);
          return of(err);
        }
      )
    );
  }
  AgetCitiesOfCountryId(id: number) {
    const url = `${this.apiCitiesOfCountryId}/${id}`;
    return this.http.get(url).pipe(
      catchError(
        err => {
          console.log("error of AgetCitiesOfCountryId(): " + err);
          return of(err);
        }
      )
    );
  }
  AgetDistrictOfCityId(id: number) {
    const url = `${this.apiDistrictsOfCityId}/${id}`;
    return this.http.get(url).pipe(
      catchError(
        err => {
          console.log("error of AgetDistrictOfCityId(): " + err);
          return of(err);
        }
      )
    );
  }

  AupdateAddressFromId(id: number, address: Address) {
    const url = `${this.apiUserAddresses}/${id}`
    return this.http.put(url, address).pipe(
      catchError(
        err => {
          console.log("error of this.AupdateAddressFromId(): " + err);
          return of(err);
        }
      )
    );
  }
  AdeleteAddressFromId(id: number) {
    const url = `${this.apiUserAddresses}/${id}`;
    return this.http.delete(url).pipe(
      catchError(
        err => {
          console.log("error of AdeleteAddressFromId(): " + err);
          return of(err);
        }
      )
    );
  }
  AaddAddress(id: number, address: Address) {
    const url = `${this.apiUserAddresses}/user/${id}`;
    return this.http.post(url, address).pipe(
      catchError(
        err => {
          console.log("error of AaddAddress(): " + err);
          return of(err);
        }
      )
    );
  }

  getAddressFromId(id: number) {
    let options = {headers: new HttpHeaders( { 'Authorization': 'Bearer '+ localStorage.getItem("token") } )};
    const url= (this.apiUserAddresses) + '/' + (id);
    return this.http.get(url, options).pipe(
      // map ( Response => JSON.stringify(Response) ),
      catchError(error) );
  }

  updateAddressFromId(id: number, address) {
    let options = {headers: new HttpHeaders( { 'Content-Type': 'application/json', 'Authorization': 'Bearer '+ localStorage.getItem("token") } )};
    const url= (this.apiUserAddresses) + '/' + (id);
    return this.http.put(url, address, options);
  }

  getCountries() {
    let options = {headers: new HttpHeaders( { 'Authorization': 'Bearer '+ localStorage.getItem("token") } )};
    return this.http.get<CountryData>(this.apiCountries, options).pipe(
      // map ( Response => JSON.stringify(Response) ),
      catchError(error) );
  }

  getCitiesFromId(id: number) {
    let options = {headers: new HttpHeaders( { 'Authorization': 'Bearer '+ localStorage.getItem("token") } )};
    const url= this.apiCitiesOfCountryId + '/' + id;
    return this.http.get<CityData>(url, options).pipe(
      // map ( Response => JSON.stringify(Response) ),
      catchError(error) );
  }

  getDistrictsFromId(id: number) {
    let options = {headers: new HttpHeaders( { 'Authorization': 'Bearer '+ localStorage.getItem("token") } )};
    const url= this.apiDistrictsOfCityId + '/' + id;
    return this.http.get<DistrictData>(url, options).pipe(
      // map ( Response => JSON.stringify(Response) ),
      catchError(error) );
  }
}
