import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { User,UserData } from '../../models/user';
import { Router } from '@angular/router';
import { error } from '@angular/compiler/src/util';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userdata: UserData;
  private apiRoot = 'http://localhost:5000/api/';
  // private apiRoot = 'https://ubunsys.net/one/api/';
  private apiUrl = this.apiRoot + 'users';
  private apiLogin = this.apiRoot + 'token';
  

  
  constructor( private http: HttpClient, private router: Router ) {    }
  
  AupdateUser(id: number, user: User) {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put(url, user).pipe(
      catchError(
        err => {
          console.log("error of AupdateUser(): " + err);
          return of(err);
        }
      )
    );
  }

  loginUser(user) {
    //Gửi về server cần có Headers và RequestOptions
    //C1:
    //let header1 = new Headers( { 'Content-Type': 'application/json' } );
    //let options = new RequestOptions({headers: header1});
    //C2:
    let options = {headers: new HttpHeaders( { 'Content-Type': 'application/json' } )};
    //Sử dụng post truyền dữ liệu xuống Server, tham số của post cần: link api, tài khoản login và options
    return this.http.post<UserData>(this.apiLogin, user, options).pipe(
    //Nếu có kết quả sẽ map kết quả thành json, ngược lại sẽ xuất lỗi
          // map ( Response => JSON.stringify(Response) ),
          catchError(
            error => {
              console.log("Loi login of user service: " + error);
              return of(error);
            }
          ) );
  }

  getUsers(pS: number, pN: number){
    let options = {headers: new HttpHeaders( { 'Authorization': 'Bearer '+ localStorage.getItem("token") } )};
    const url= (this.apiUrl) + '/page?size=' + pS + '&current=' + pN ;
    return this.http.get<UserData>(url, options).pipe(
      // tap ( Response => Response ),
      catchError(error) );
  }

  getUserFromId(id: number){
    let options = {headers: new HttpHeaders( { 'Authorization': 'Bearer '+ localStorage.getItem("token") } )};
    const url= (this.apiUrl) + '/' + id;
    return this.http.get<UserData>(url, options).pipe(
      catchError(error) );
  }

  deleteUser (id: number) {
    let options = {headers: new HttpHeaders( { 'Authorization': 'Bearer '+ localStorage.getItem("token") } )};
    const url= (this.apiUrl) + '/' + (id);
    return this.http.delete(url, options).pipe(
      map ( Response => JSON.stringify(Response) ),
      catchError(error) );
  }

  updateUser (user: User) {
    const url= (this.apiUrl) + '/' + (user.id);
    let options = {headers: new HttpHeaders( { 'Content-Type': 'application/json', 'Authorization': 'Bearer '+ localStorage.getItem("token") } )};
    return this.http.put(url, user, options).pipe(
      map ( Response => JSON.stringify(Response) ),
      catchError(error) );
  }

  AsearchUser(searchValue: string, size: number, current: number) {
    const url = `${this.apiUrl}/page?search=${searchValue}&size=${size}&current=${current}`;
    return this.http.get(url).pipe(
      catchError(
        err => {
          console.log("error of AsearchUser(): " + JSON.stringify(err));
          return of(err);
        }
      )
    );
  }
}
