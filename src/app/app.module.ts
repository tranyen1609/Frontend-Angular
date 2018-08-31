import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbdModalBasic } from './modal/addressDetails/addressDetails.Modal';
import { UserDetailModal } from './modal/user-detail-modal/user-detail.modal';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { UserService } from '../services/users/user.service';
import { AddressService } from '../services/address/address.service';
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
import { UserAddressComponent } from './Modal/user-address/user-address.component';
import { ValidateComponent } from './validate/validate.component';
// import { ContactComponent } from './contact/contact.component';

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

    // ContactComponent,
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
        tokenGetter: () => {
          return localStorage.getItem("token");
        },
        whitelistedDomains: ['localhost:5000'],
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
