import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AddressService } from '../../services/address/address.service';
import { CountryData } from '../../models/country';
import { User } from '../../models/user';
import { Address } from '../../models/address';
import { CityData } from '../../models/city';
import { DistrictData } from '../../models/district';

@Component({
  selector: 'app-user-address',
  templateUrl: './user-address.component.html',
  styleUrls: ['./user-address.component.css']
})
export class UserAddressComponent implements OnInit {

  countryData_Home: CountryData = new CountryData();
  cityData_Home: CityData = new CityData();
  districtData_Home: DistrictData = new DistrictData();

  countryData_Work: CountryData = new CountryData();
  cityData_Work: CityData = new CityData();
  districtData_Work: DistrictData = new DistrictData();

  formUsers: FormGroup;
  closeResult: string;

  @Output() newUser = new EventEmitter<object>();
  constructor(private modalService: NgbModal, private addressService: AddressService, private fb: FormBuilder) { }

  ngOnInit() {
    this.createForm();
    this.getCountries_Home();
    this.getCountries_Work();
  }

  createForm() {
    this.formUsers = this.fb.group({
      username: ['', [
        Validators.required,
        Validators.minLength(2)
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(5)
      ]],
      phone: [''],
      email: ['', [
        Validators.email
      ]],
      addressHome: this.fb.group({
        idCountry_Home: [0],
        idCity_Home: [0],
        idDistrict_Home: [0],
        newStreet_Home: [''],
      }),
      addressWork: this.fb.group({
        idCountry_Work: [0],
        idCity_Work: [0],
        idDistrict_Work: [0],
        newStreet_Work: [''],
      })
    });
  }

  createUser() {
    let user: User = new User( undefined, this.formUsers.get('username').value, this.formUsers.get('password').value );

    let address: Address = undefined;
    let address2: Address = undefined;

    if(this.formUsers.get('addressHome.idCountry_Home').value != 0 || this.formUsers.get('addressHome.idCity_Home').value != 0 || this.formUsers.get('addressHome.idDistrict_Home').value != 0 || this.formUsers.get('addressHome.newStreet_Home').value != "")
      address = new Address(1,this.formUsers.get('addressHome.idCountry_Home').value,this.formUsers.get('addressHome.idCity_Home').value,this.formUsers.get('addressHome.idDistrict_Home').value,this.formUsers.get('addressHome.newStreet_Home').value);
    
    if(this.formUsers.get('addressWork.idCountry_Work').value != 0 || this.formUsers.get('addressWork.idCity_Work').value != 0 || this.formUsers.get('addressWork.idDistrict_Work').value != 0 || this.formUsers.get('addressWork.newStreet_Work').value != "")
      address2 = new Address(2,this.formUsers.get('addressWork.idCountry_Work').value,this.formUsers.get('addressWork.idCity_Work').value,this.formUsers.get('addressWork.idDistrict_Work').value,this.formUsers.get('addressWork.newStreet_Work').value);
      

    let addresses = [address,address2];
    
    return this.addressService.createUserAddress( user, addresses ).subscribe(
      (data: any) => {
        let user = data.user;
        this.newUser.emit(user);
    });
  }

  //Home address
  getCountries_Home() {
    return this.addressService.getCountries().subscribe(data => {
      this.countryData_Home = data;

    });
  }

  getCitiesFromId_Home(id) {
    return this.addressService.getCitiesFromId(id).subscribe(data => {
      this.cityData_Home = data;
      this.getDistrictsFromId_Home(0);
      this.formUsers.get('addressHome').patchValue({
        idCity_Home: 0,
        idDistrict_Home: 0
      });
    });
  }

  getDistrictsFromId_Home(id) {
    return this.addressService.getDistrictsFromId(id).subscribe(data => {
      this.districtData_Home = data;
    });
  }

  //Work address
  getCountries_Work() {
    return this.addressService.getCountries().subscribe(data => {
      this.countryData_Work = data;
    });
  }

  getCitiesFromId_Work(id) {
    return this.addressService.getCitiesFromId(id).subscribe(data => {
      this.cityData_Work = data;
      this.getDistrictsFromId_Work(0);
      this.formUsers.get('addressWork').patchValue({
        idCity_Work: 0,
        idDistrict_Work: 0
      });
    });
  }

  getDistrictsFromId_Work(id) {
    return this.addressService.getDistrictsFromId(id).subscribe(data => {
      this.districtData_Work = data;
    });
  }

  open(content) {

    this.createForm();

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', backdrop: "static", size: "lg" }).result.then((result) => {

      this.createUser();

      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      this.createForm()
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
