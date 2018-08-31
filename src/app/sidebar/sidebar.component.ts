import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  // authentication: boolean;
  // abc=AppComponent.authentication;
  idUser: number;
  // getAuthentication(){
  //   return AppComponent.authentication;
  // }

  authentication: boolean;

  constructor(private jwt: JwtHelperService) { 
    // this.getAuthentication();
  }

  ngOnInit() {
    this.getClaimOfToken();
  }

  getClaimOfToken() {
    let decodedToken = this.jwt.decodeToken(localStorage.getItem("token"));
    this.idUser = decodedToken.userId;
    // console.log(decodedToken.permissionCount);
    localStorage.setItem("permissionCount", decodedToken.permissionCount);

    if(decodedToken.permissionCount == 3)
    {
      this.authentication = true;
    }
    else{
      this.authentication = false;
    }
  }

  
  

}
