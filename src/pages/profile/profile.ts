import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import {ProfileEditPage} from '../../pages/profile-edit/profile-edit';
import {ChangePasswordPage} from '../../pages/change-password/change-password';
/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
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
// class Profile {

//  constructor(params: NavParams) {
//    console.log('UserId', params.get('userId'));
//  }
// }

