import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../../services/users/user.service';
import { UserData, User } from '../../../models/user';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-detail-modal',
  templateUrl: './user-detail.modal.html',
  styleUrls: ['./user-detail.modal.css']
})
export class UserDetailModal implements OnInit {

  @Input('idUser') idUser;
  userData: UserData;
  user: User;
  closeResult: string;
  formUser: FormGroup;
  userName: string;
  passWord: string;

  constructor( private router: Router, private modalService: NgbModal, private userService: UserService, private fb: FormBuilder ) { }

  ngOnInit() {
    this.getUserFromId();
  }

  createForm() {
    this.formUser = this.fb.group({
      username: [this.user.name, [
        Validators.required,
        Validators.minLength(2)
      ]],
      password: [this.user.password, [
        Validators.required,
        Validators.minLength(5)
      ]]
    });
  }

  getUserFromId() {
    this.userService.getUserFromId(this.idUser).subscribe(data => {
      this.userData = data;
      this.user = this.userData.users[0];
      this.createForm();
    })
  }

  onSubmit() {
    return this.userService.updateUser(this.idUser, this.formUser.get('username').value, this.formUser.get('password').value).subscribe(data => 
      window.location.reload())
  }

  open(content) {

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', backdrop: "static" }).result.then((result) => {
      this.createForm();
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.createForm();
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
