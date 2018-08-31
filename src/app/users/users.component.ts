import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/users/user.service';
import { UserData, User } from '../../models/user';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  userdata: UserData = new UserData();

  p = 1;
  totalItems: number;
  totalPages : number;

  searchValue: string;
  
  constructor(private router: Router, private userService: UserService) { 
  }

  ngOnInit() {
    this.getUsers();
  }
  
  pageChanged(page) {
    this.p = page;
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers(4,this.p).subscribe((data) => {
      if(Object.keys(data).length > 0){
        this.userdata = data;
        this.totalItems = data.pagination.totalItems;
        this.totalPages = Math.ceil(this.totalItems/4);
      }
      else
      {
        this.router.navigate(['login']);
      }
    });
  }

  deleteUser(id: number) {
    return this.userService.deleteUser(id).subscribe(data =>
      this.getUsers());
  }

  AresetCurrentPage() {
    this.p = 1;
    this.AgetSearchValue();
  }

  AgetSearchValue() {
    this.userService.AsearchUser(this.searchValue, 4,this.p).subscribe(
      result => {
        this.userdata = result;
        if(result.pagination != null)
          this.totalItems = result.pagination.totalItems;
        else
          this.totalItems = 0;
      }
    );
  }
}
