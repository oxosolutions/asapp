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

@Injectable()
export class AioneHelperProvider {
	DeviceInfo={};
	base64Image;
	Status:any
 
  constructor(public alert:AlertController,private network: Network,private camera:Camera,private device: Device,private calender:Calendar) {
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
  	let alert = this.alert.create({
	    title: 'Connected',
	    subTitle: 'You have an internet connection',
	    buttons: ['ok']
  	});
	  let disconnect = this.alert.create({
	    title: 'Disconnected !!',
	    subTitle: 'No Internet Connection',
	    buttons: ['ok']
	  });
	  if(this.network.onConnect().subscribe()){
	  	if (this.network.type === 'none' ) {
	  		disconnect.present();	
			}else{
				alert.present();
			}
	  }
  }
  wifi(){
	  let disconnect2 = this.alert.create({
	    title: 'Disconnected !!',
	    subTitle: 'Wifi Connection has been lost',
	    buttons: ['ok']
	  });
	  let wifi2 = this.alert.create({
	    title: 'Wifi connected',
	    subTitle: 'you got a Wifi Connection',
	    buttons: ['ok']
	  });
	  if(this.network.onConnect().subscribe()){
	  	if (this.network.type === 'wifi') {
				wifi2.present();
			}else{
				disconnect2.present();
			}
	  }else{
	  	this.Status='Disconnect'
	  	disconnect2.present();
	  }
	}
 

}
