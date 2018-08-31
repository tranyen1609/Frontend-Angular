import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-validate',
  templateUrl: './validate.component.html',
  styleUrls: ['./validate.component.css']
})
export class ValidateComponent implements OnInit {

  @Input() control;
  @Input() namecontrol;

  constructor() { }

  ngOnInit() {
    console.log(this.namecontrol);
  }

  get message(){
    for(let er in this.control.errors){
      if(this.control.dirty){
        return this.getErrorMessage(er, this.control.errors[er]);
      }
    }
  }
  
  getErrorMessage(er, value){
    // let message = {
    //   'required' : `Vui lòng nhập ${this.namecontrol}`,
    //   'minlength' : `${this.namecontrol} tối thiểu ${value.requiredLength} kí tự`,
    //   'maxlength' : `${this.namecontrol} tối đa ${value.requiredLength} kí tự`,
    //   'pattern' : `${this.namecontrol} không đúng định dạng`
    // }
    let message = {
      'required' : `This is required!`,
      'minlength' : `You must enter at least ${value.requiredLength} characters`,
      'maxlength' : `You must enter a max ${value.requiredLength} characters`,
      'pattern' : `You enter is invalid`
    }
    return message[er];
  }

}
