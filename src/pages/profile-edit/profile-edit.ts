import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import {ProfilePage} from '../../pages/profile/profile';
/**
 * Generated class for the ProfileEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile-edit',
  templateUrl: 'profile-edit.html',
})
export class ProfileEditPage {

  constructor( public viewCtrl: ViewController
, public navCtrl: NavController, public navParams: NavParams) {
  	
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfileEditPage');
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
 //   dismiss() {
 //   let data = { 'foo': 'bar' };
 //   this.viewCtrl.dismiss(data);
 // }

}
