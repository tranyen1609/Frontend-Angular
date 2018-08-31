import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  static expiredToken: boolean;

  getStaticEToken() {
    return AppComponent.expiredToken;
}

  constructor(private token: JwtHelperService) {
    this.checkToken();
  }

  

  checkToken() {
    let isExpired;
    try {
      isExpired = this.token.isTokenExpired(localStorage.getItem("token"));
      if(isExpired === true) {
        AppComponent.expiredToken = false;
        console.log("token hết hạn");
      }
      else {
        AppComponent.expiredToken = true;
        console.log("token còn hạn");
      }
    }
    catch(err) {
      AppComponent.expiredToken = false;
      localStorage.removeItem("token");
    }
    
  }

  

  ngOnInit() {
    
  }
}
