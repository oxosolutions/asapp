//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HomePage } from '../../pages/home/home';
import { ListPage } from '../../pages/list/list';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Calendar } from '@ionic-native/calendar';
import { Device } from '@ionic-native/device';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Network } from '@ionic-native/network';
import { AlertController } from 'ionic-angular';
import { ActivationPage } from '../../pages/activation/activation';

@Injectable()
export class AioneHelperProvider {
	DeviceInfo={};
	base64Image;
	Status:any;
  message : string='hello';
 
  constructor(public alert:AlertController,private network: Network,private camera:Camera,
  	private device: Device,private calender:Calendar) {
    console.log('Hello AioneHelperProvider Provider');
  }
  deviceInfo(){
    this.DeviceInfo['cordova']=this.device.cordova;
    this.DeviceInfo['model']=this.device.model;
    this.DeviceInfo['platform']=this.device.platform;
    this.DeviceInfo['version']=this.device.version;
    this.DeviceInfo['manufacturer']=this.device.manufacturer;
    this.DeviceInfo['serial']=this.device.serial;
    return this.DeviceInfo['model'];
  }
  internet(){
  	return new Promise ((resolve,reject)=>{
  		if(this.network.onConnect().subscribe()){
		  	if (this.network.type === 'none' ) {
		  		//this.showAlert('Disconnected !!','No Internet Connection');
				}else{
					//this.showAlert('Connected !!','You have an internet connection');	
				}resolve('yes connected');
	  	}
  	}) 
  }
  showAlert(hello,message){
  	let alert=this.alert.create({
	    title: hello,
	    subTitle: message,
	    buttons: ['ok']
	  });
	  alert.present();
  }
  wifi(){
	  if(this.network.onConnect().subscribe()){
	  	if (this.network.type === 'wifi') {
				this.showAlert('Wifi connected','you got a Wifi Connection');	
			}else{
				this.showAlert('Disconnected ','Wifi Connection has been lost');	
			}
	   }	 
	}
}
