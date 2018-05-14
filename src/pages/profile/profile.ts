import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import {ProfileEditPage} from '../../pages/profile-edit/profile-edit';
import {ChangePasswordPage} from '../../pages/change-password/change-password';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AioneServicesProvider } from '../../providers/aione-services/aione-services';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { DashboardPage } from '../../pages/dashboard/dashboard';
import { ImageResizer, ImageResizerOptions } from '@ionic-native/image-resizer';

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
  loader:any;
  sidemenu;
  simpleImg:any;
  imgs:any;

  constructor(private imageResizer: ImageResizer,public events: Events,private loaderCtrl:LoadingController,public alert:AlertController,public servicesProvider:AioneServicesProvider,private camera:Camera,public navCtrl: NavController, public navParams: NavParams,public modalCtrl: ModalController) {
  }
  ionViewDidLoad() {
    this.profileFunction();
  }
  profileFunction(){

    let userId=localStorage.getItem("userId");
    this.servicesProvider.SelectWhere("users",'id', userId).then((result:any)=>{
      console.log(result.rows.item(0));
      let data=result.rows.item(0);
       this.base64Image = localStorage.getItem("imgData");
      data["image"]=this.base64Image;
      this.name=data["name"];
      this.Email=data["email"];
      this.events.publish('user:created', data); 
      this.servicesProvider.SelectWhere("users","id",'"'+ data["id"]+'"').then((result:any)=>{
        this.userDetail=result.rows.item(0);
        console.log(this.userDetail);
       
        // if(localStorage.getItem("imgData") != null || localStorage.getItem("imgData") != "" || localStorage.getItem("imgData") != "null"){
        //   this.ProfileUpdate().then(()=>{
        // })
        // }else{

        // }
      });
     });
 
  }
  ProfileUpdate(){
    return new Promise((resolve,reject)=>{
      let image=localStorage.getItem("imgData");
      console.log(image);
      this.imgs=image;
    })
  }
  camera1(){
    let alert=this.alert.create({
      subTitle: "Select any option to upload image",
      buttons: [
      {
        text: 'Gallery',
        handler: data => {
          console.log('Cancel clicked');
          this.takePhoto(0); 
        }
      },
      {
        text: 'Camera',
        handler: data => {
          console.log('Cancel clicked');
          this.takePhoto(1); 
        }
      },
      {
        text: 'Cancel',
        handler: data => {   
        }
      }
      ],

    });
    alert.present();
   
  }
  takePhoto(sourceType:number) {
    let FileOutputStream  = null;
    let fos=null;
     this.loader = this.loaderCtrl.create({
      spinner: 'crescent',
      content: `
      <div class="custom-spinner-container">
        <div class="custom-spinner-box">`+'Verifying Your Details'+`</div>
      </div>`,
    });
    this.loader.present();
    console.log("camera clicked");
    const options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    allowEdit: true,
    correctOrientation: true,
    sourceType:sourceType,
    targetWidth: 230,
    targetHeight: 190,
    }
    this.camera.getPicture(options).then((imageData) => {
      let data = 'data:image/jpeg;base64,' + imageData;
      console.log(data);
     // this.resizer(data).then((result:any)=>{  console.log("returned data");
     //    console.log(result);
     //      this.base64Image = data;
     //      this.loader.dismiss();
     //      localStorage.setItem("imgData", result);
     //    })

      this.base64Image = 'data:image/jpeg;base64,' + imageData;
      console.log(this.base64Image);
      localStorage.setItem("imgData", this.base64Image);
      this.profileFunction();
      this.loader.dismiss();
      
     
    }, (err) => {
        this.loader.dismiss();
    });
  } 
  resizer(data){
    return new Promise((resolve,reject)=>{
    let options = {
     uri: data,
     quality: 10,
     width: 10,
     height: 10
    } as ImageResizerOptions;

    this.imageResizer.resize(options).then((filePath: string) =>{
      console.log('FilePath', filePath)
     console.log("djkfd");
     resolve(filePath);
    },(err) => {
        console.log(err);
    });

    // .catch(e => console.log(e));
      });
  }
  EditModal() {
	  let profileModal = this.modalCtrl.create(ProfileEditPage, {"userId": this.userDetail });
    profileModal.onDidDismiss(() => {
      this.profileFunction();
    });
	  profileModal.present();
	}
  ResetPassword(){
    let model=this.modalCtrl.create(ChangePasswordPage, {'reset':this.userDetail});
    model.present();
  }


}
