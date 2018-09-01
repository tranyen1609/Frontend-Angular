import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User, UserData } from '../models/user';
import { UserService } from '../services/users/user.service';
import { AppComponent } from '../app.component';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  myName: string;
  myPassword: string;
  status: string = "";
  userdata: UserData = new UserData();
  constructor(
    private router: Router, 
    private userService: UserService,
    private jwt: JwtHelperService
  ) { }

  ngOnInit() {
    if(localStorage.getItem("token")){
      this.router.navigate(['home']);
    }
    
  }

  loginUser() {
    //Tạo user truyền 2 tham số nhập vào
    let user: User = new User(undefined, this.myName, this.myPassword);
    //Gọi hàm loginUser truyền tham số vào và Subcribe là thực hiện các lệnh
    return this.userService.loginUser(user).subscribe(data => {
      this.userdata = data;
      if(data.status === 0)
        this.status = `error code ${data.status} and error detail: ${data.message}`;
      else {
        localStorage.setItem("token", data["token"]);
        if (localStorage.getItem("token") != "") {
          localStorage.setItem("user", this.myName);
          this.router.navigate(['home']);
          AppComponent.expiredToken = true;

          let decodedToken = this.jwt.decodeToken(localStorage.getItem("token"));
          localStorage.setItem("permissionCount", decodedToken.permissionCount);
          localStorage.setItem("userId", decodedToken.userId);

          if(localStorage.getItem("permissionCount") == "3") {
            this.router.navigate(['home']);
            console.log("admin");
          }
          else if(localStorage.getItem("permissionCount") == "0") {
            this.router.navigate(['account']);
            console.log("user");
          }
        }
        else {
          this.status = this.userdata.error.message;
        }
      }
    }
  );
}

}
