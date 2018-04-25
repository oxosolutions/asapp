import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import {ProfileEditPage} from '../../pages/profile-edit/profile-edit';
import {ChangePasswordPage} from '../../pages/change-password/change-password';
import { Camera, CameraOptions } from '@ionic-native/camera';
@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  name:any;
  Email:any;
  public base64Image:string
  constructor(private camera:Camera,public navCtrl: NavController, public navParams: NavParams,public modalCtrl: ModalController) {
  }
  ionViewDidLoad() {
    this.name=localStorage.getItem("name");
    this.Email=localStorage.getItem("username");
  }
  camera1(){
    console.log("camera clicked");
    const options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    allowEdit: true,
    }
    this.camera.getPicture(options).then((imageData) => {
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
    });
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
