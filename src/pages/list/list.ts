import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AioneHelperProvider } from '../../providers/aione-helper/aione-helper';
import { AioneServicesProvider } from '../../providers/aione-services/aione-services';
import { Device } from '@ionic-native/device';
import { Camera, CameraOptions } from '@ionic-native/camera';
@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  result:any;
  public base64Image:string

  constructor(private camera:Camera,public AioneHelp:AioneHelperProvider,public navCtrl: NavController, public navParams: NavParams) {
  }
  
  Device(){
    let result123:any;
    this.result=this.AioneHelp.deviceInfo();
  }
  internetCheck(){ 
  	this.AioneHelp.internet();
  }
  wifiCheck(){
  	this.AioneHelp.wifi();
  }

  camera1(){
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
 
 
}
