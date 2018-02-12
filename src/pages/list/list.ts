import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AioneHelperProvider } from '../../providers/aione-helper/aione-helper';
import { AioneServicesProvider } from '../../providers/aione-services/aione-services';
import { Device } from '@ionic-native/device';
@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  result:any;
  constructor(private device: Device,public AioneHelp:AioneHelperProvider,public navCtrl: NavController, public navParams: NavParams) {
   
  }
  calender1(){
    let result123:any;
    this.result=this.AioneHelp.deviceInfo();

  }
}
