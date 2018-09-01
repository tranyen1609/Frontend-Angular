import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  idUser: number;
  isAdmin: boolean = localStorage.getItem("permissionCount") == "3" ? true : false;

  constructor() { }

  ngOnInit() { }

  
  

}
