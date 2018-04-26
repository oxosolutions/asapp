import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import {ProfileEditPage} from '../../pages/profile-edit/profile-edit';
import {ChangePasswordPage} from '../../pages/change-password/change-password';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AioneServicesProvider } from '../../providers/aione-services/aione-services';
@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  name:any;
  Email:any;
  public base64Image:string
  userDetail:any;
  constructor(public servicesProvider:AioneServicesProvider,private camera:Camera,public navCtrl: NavController, public navParams: NavParams,public modalCtrl: ModalController) {
  }
  ionViewDidLoad() {
    this.name=localStorage.getItem("name");
    this.Email=localStorage.getItem("username");
    this.servicesProvider.SelectWhere("users","email",'"'+localStorage.getItem("username")+'"').then((result:any)=>{
      this.userDetail=result.rows.item(0);
      console.log(this.userDetail);
    })

  }
  camera1(){
    this.takePhoto(0);
    
  }
  takePhoto(sourceType:number) {
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
	   let profileModal = this.modalCtrl.create(ProfileEditPage, {"userId": this.userDetail });
	   profileModal.present();
	}

  ResetPassword(){
    let model=this.modalCtrl.create(ChangePasswordPage, {'reset':this.userDetail});
    model.present();
  }


}
