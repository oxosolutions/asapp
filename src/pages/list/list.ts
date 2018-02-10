import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AioneHelperProvider } from '../../providers/aione-helper/aione-helper';
import { AioneServicesProvider } from '../../providers/aione-services/aione-services';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
 
  constructor(public AioneHelp:AioneHelperProvider,public navCtrl: NavController, public navParams: NavParams) {
  }
  calender(){
    this.AioneHelp.cal();
  }
}
