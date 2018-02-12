//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HomePage } from '../../pages/home/home';
import { ListPage } from '../../pages/list/list';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Calendar } from '@ionic-native/calendar';
import { Device } from '@ionic-native/device';
import { Camera, CameraOptions } from '@ionic-native/camera';

@Injectable()
export class AioneHelperProvider {
	DeviceInfo={};
	base64Image;
  constructor(private camera:Camera,private device: Device,private calender:Calendar) {
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
  img(){
  	
  }
 

}
