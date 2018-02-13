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
  connection2(){
  	let alert = this.alert.create({
    title: 'Connected',
    subTitle: 'Internet Connection is Establised',
    buttons: ['ok']
  });
  let disconnect = this.alert.create({
    title: 'Disconnected !!',
    subTitle: 'Internet Connection has been lost',
    buttons: ['ok']
  });
  let wifi = this.alert.create({
    title: 'Wifi connected',
    subTitle: 'you got a Wifi Connection',
    buttons: ['ok']
  });
 	let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
			this.Status='Disconnect'
			 disconnect.present();
	});                                                                            
	let connectSubscription = this.network.onConnect().subscribe(() => {
			 alert.present();
				setTimeout(() => {
				if (this.network.type === 'wifi') {
				  wifi.present();
				}
			}, 3000);
		});

  }
 

}
