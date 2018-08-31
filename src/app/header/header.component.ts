import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  name: string = localStorage.getItem("user");
  idUser: number;
  constructor(private router: Router) { }

  ngOnInit() {
  }

  logoutUser() {
    localStorage.removeItem("token");
    AppComponent.expiredToken = false;
  }
}
