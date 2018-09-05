import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbdModalBasic } from './modal/addressDetails/addressDetails.modal';
import { UserDetailModal } from './modal/user-detail-modal/user-detail.modal';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { UserService } from './services/users/user.service';
import { AddressService } from './services/address/address.service';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { UsersComponent } from './users/users.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HomeComponent } from './home/home.component';

import { JwtModule } from '@auth0/angular-jwt';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { UserAddressComponent } from './modal/user-address/user-address.component';
import { ValidateComponent } from './validate/validate.component';
import { AccountInfomationComponent } from './account-infomation/account-infomation.component';

export function jwtTokenGetter() {
  return localStorage.getItem("token");
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserDetailComponent,
    PagenotfoundComponent,
    UsersComponent,
    HeaderComponent,
    SidebarComponent,
    HomeComponent,

    NgbdModalBasic,

    UserDetailModal,

    UserAddressComponent,

    ValidateComponent,

    AccountInfomationComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    NgbModalModule,
    AngularFontAwesomeModule,

    JwtModule.forRoot({
      config: {
        tokenGetter: jwtTokenGetter,
        whitelistedDomains: ['localhost:5000', 'ubunsys.net'],
        skipWhenExpired: true
      }    
    })
  ],
  providers: [
    UserService,
    AddressService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
