import { Component, OnInit } from '@angular/core';
import { UserAddressesDetail, AddressDetail } from '../../models/address';
import { User } from '../../models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { AddressService } from '../../services/address/address.service';
import { UserService } from '../../services/users/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})

export class UserDetailComponent implements OnInit {
  userAddresses: UserAddressesDetail;
  userData: User;
  id: number;
  isBoolean: boolean;

  constructor(private addressService: AddressService, private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit() {
    if(localStorage.getItem("permissionCount") == "3")
    {
      this.isBoolean = true;
      this.getUserAddresses();
    }
    else {
      this.isBoolean = false;
      this.getUserFromId();
    }
  }

  getUserAddresses() {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.addressService.getUserAddressesOfUserId(this.id).subscribe(
      data => {
        // console.log(data);
        this.userAddresses = data.pop();
      }
    );
  }

  getUserFromId() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.userService.getUserFromId(id).subscribe(
      result => {
        console.log("aad");
        console.log(result.users[0]);
        // this.userAddresses = new UserData();
        this.userData = result.users[0];
      }
    );
  }

  actionAddresses(info: any) {

    if (info.modalType === 'edit') {
      let addresses = [];
      this.userAddresses.addresses.map(
        obj => {
          if (obj.id === info.addressInfo.id) {
            addresses.push(info.addressInfo);
          }
          else
            addresses.push(obj);
        }
      );
      this.userAddresses.addresses = addresses;
    }
    else if (info.modalType === 'add') {
      this.userAddresses.addresses.push(info.addressInfo);
    }
  }

  deleteAddress(id: number) {
    if (this.userAddresses.user.address2 === id) {
      this.userAddresses.user.address2 = null;
    }
    if (this.userAddresses.user.address1 === id) {
      this.userAddresses.user.address1 = null;
    }

    this.addressService.AdeleteAddressFromId(id).subscribe(
      () => {
        this.userService.AupdateUser(this.userAddresses.user.id, this.userAddresses.user).subscribe();

        this.userAddresses.addresses = this.userAddresses.addresses.filter(
          obj => obj.id !== id
        );


      },
      err => console.log("error of subscribe AdeleteAddressFromId(): " + err),
      () => console.log("delete address success!")
    );
  }

  // getUserDetail() {
  //   const id = +this.route.snapshot.paramMap.get('id');
  //   return this.addressService.getUserAddressesFromId(id).subscribe(data => {
  //     if (Object.keys(data).length > 0) {
  //       this.addressesDetail = data[0];
  //       this.myId = id;
  //       this.myUser = this.addressesDetail.user.name;
  //       this.myPass = this.addressesDetail.user.password;
  //       this.addresses = this.addressesDetail.addresses;
  //     }
  //   });
  // }

  // getAddressFromId(id: number, addresstype: string) {
  //   this.addressType = addresstype;
  //   return this.addressService.getAddressFromId(id).subscribe(data => {
  //     this.detail_address = false;
  //     this.addressData = data['address'][0];
  //     this.idCountry = this.addressData.countryId;
  //     this.idCity = this.addressData.cityId;
  //     this.idDistrict = this.addressData.districtId;
  //     this.street = this.addressData.street;
  //     this.idAddress = this.addressData.id;
  //     this.addressTypeId = this.addressData.addressTypeId;
  //     this.getCountries();
  //     this.getCitiesFromId(this.addressData.countryId);
  //     this.getDistrictsFromId(this.addressData.cityId);
  //   });
  // }

  // updateAddressFromId() {
  //   if (this.idCountry != 0 && this.idCity != 0 && this.idDistrict != 0) {
  //     let address: Address = new Address(+this.addressTypeId, +this.idCountry, +this.idCity, +this.idDistrict, this.street);
  //     console.log(address);
  //     this.addressService.updateAddressFromId(+this.idAddress, address).subscribe(data => {
  //       this.detail_address = true;
  //     });
  //   }
  //   else
  //   {
  //     this.message = "The information is invalid!";
  //   }
  // }

  // getCountries() {
  //   return this.addressService.getCountries().subscribe(data => {
  //     this.countryData = data;
  //   });
  // }

  // getCitiesFromId(id: number) {
  //   return this.addressService.getCitiesFromId(id).subscribe(data => {
  //     this.cityData = data;
  //     this.idCity = 0;
  //     this.idDistrict = 0;
  //     this.getDistrictsFromId(this.idCity);
  //   });
  // }

  // getDistrictsFromId(id: number) {
  //   return this.addressService.getDistrictsFromId(id).subscribe(data => {
  //     this.districtData = data;
  //   });
  // }

  // updateUser() {
  //   const id = +this.route.snapshot.paramMap.get('id');
  //   return this.userService.updateUser(id, this.myUser, this.myPass).subscribe(data =>
  //     this.router.navigate(['main']));
  // }

  // editUser() {
  //   this.detail_user = false;
  // }

  // cancel() {
  //   this.detail_address = true;
  //   this.detail_user = true;
  //   // this.location.back();
  // }
}
