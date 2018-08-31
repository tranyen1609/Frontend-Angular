import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AddressService } from '../../../services/address/address.service'
import { Address } from '../../../models/address'
import { Country } from '../../../models/country'
import { FormGroup, Validators, FormBuilder } from '@angular/forms'
import { Action } from 'rxjs/internal/scheduler/Action';


@Component({
  selector: 'ngbd-modal-basic',
  templateUrl: './addressDetails.modal.html'
})
export class NgbdModalBasic implements OnInit  {
  closeResult: string;

  @Input() modalUDId: number;

  @Input() userId: number;
  @Input() modalType: string;

  addressIds: Address;
  addressTypes: any;
  countries: Array<Country>;
  cities: any;
  districts: any;

  @Output() _addressDetail = new EventEmitter<object>();
  public formUsers: FormGroup;
  
  constructor(private modalService: NgbModal, private data: AddressService, private fb: FormBuilder) { }

  ngOnInit(){
    if(this.modalType === 'edit')
      this.getUserAddressOfId();
    else if(this.modalType === 'add') {
      this.addressIds = new Address();
      this.getAddressType();
      this.getCountry();
      this.createForm();
    }
  }

  createForm() {
    this.formUsers = this.fb.group({
      id: [this.modalUDId],
      addressTypeId: [this.addressIds.addressTypeId,[
        Validators.required
      ]],
      countryId: [this.addressIds.countryId,[
        Validators.required
      ]],
      cityId: [this.addressIds.cityId,[
        Validators.required
      ]],
      districtId: [this.addressIds.districtId,[
        Validators.required
      ]],
      street: [this.addressIds.street,[
        Validators.required
      ]]
    });
  }

  

  getUserAddressOfId() {
    this.data.AgetAddressFromId(this.modalUDId).subscribe(
      result => {
        this.addressIds = result.address;
        
        this.getAddressType();
        this.getCountry();
        this.getCitiesOfCountryId(this.addressIds.countryId);
        this.getDistrictsOfCityId(this.addressIds.cityId);
        this.createForm();
      }
    );
  }

  getAddressType() {
    this.data.AgetAddressTypes().subscribe(
      result => {
        this.addressTypes = result.addressTypes;
      }
    );
  }

  getCountry() {
    this.data.AgetCountries().subscribe(
      result => {
        this.countries = result.countries;
      }
    );
  }

  getCitiesOfCountryId(id: number) {
    this.data.AgetCitiesOfCountryId(id).subscribe(
      result => {
        this.cities = result.cities;
      }
    );
  }

  getDistrictsOfCityId(id: number) {
    this.data.AgetDistrictOfCityId(id).subscribe(
      result => {
        this.districts = result.districts;
      }
    );
  }

  changeCountry(id) {
    this.addressIds = null;
    this.districts = null;
    this.getCitiesOfCountryId(id);
    this.formUsers.patchValue({
      cityId: null,
    });
  }

  changeCity(id: number) {
    if(id != null)
      this.getDistrictsOfCityId(id);
    this.formUsers.patchValue({
      districtId: null,
      street: ""
    });
  }

  actionAddress() {
    const addressType = this.addressTypes.find(
      obj => obj.id === this.formUsers.value.addressTypeId
    );
    const district = this.districts.find(
      obj => obj.id === this.formUsers.value.districtId
    );
    const city: any  = this.cities.find(
      obj => obj.id === this.formUsers.value.cityId
    );
    const country: Country = this.countries.find(
      obj => obj.id === this.formUsers.value.countryId
    );

    if(this.modalType === 'edit') {
      this.data.AupdateAddressFromId(this.modalUDId, this.formUsers.value).subscribe(
        () => {
          if(district && city && country)
            this._addressDetail.emit({ 
              modalType: this.modalType,
              addressInfo: {
                id: this.formUsers.value.id,
                street: this.formUsers.value.street,
                addressType: addressType.name,
                district: district.name,
                city: city.name,
                country: country.name
              }
            });
        },
        err => console.log("error subscribe: " + err),
        () => console.log("not error!")
      ); 
    }
    else if( this.modalType === 'add' ) {
      this.data.AaddAddress(this.userId, this.formUsers.value).subscribe(
        result => {
          let addressId = result.address.id;
          if(district && city && country)
            this._addressDetail.emit({ 
              modalType: this.modalType,
              addressInfo: {
                id: addressId,
                street: this.formUsers.value.street,
                addressType: addressType.name,
                district: district.name,
                city: city.name,
                country: country.name
              }
            });
        },
        err => console.log("loi subscribe: " + err),
        () => {
          
        }
      );
    }
  }

  open(content) {

    //reset form when user click add from time of two.
    if(this.modalType === 'add'){
      this.addressIds = new Address();
      this.createForm();
    }

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', backdrop: "static" }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;

      this.actionAddress();

    }, (reason) => {
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