import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import {ProfileEditPage} from '../../pages/profile-edit/profile-edit';
import {ChangePasswordPage} from '../../pages/change-password/change-password';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  name:any;
  Email:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public modalCtrl: ModalController) {
  }
  ionViewDidLoad() {
    this.name=localStorage.getItem("name");
    this.Email=localStorage.getItem("username");
  }
  EditModal() {
	   let profileModal = this.modalCtrl.create(ProfileEditPage, { userId: 8675309 });
	   profileModal.present();
	}
  ResetPassword(){
    let model=this.modalCtrl.create(ChangePasswordPage, {'reset':"hii"});
    model.present();
  }


}
