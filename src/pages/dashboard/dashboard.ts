import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AioneHelperProvider } from '../../providers/aione-helper/aione-helper';
import { AioneServicesProvider } from '../../providers/aione-services/aione-services';
import {ListsurveyPage} from '../../pages/listsurvey/listsurvey';
import { RecordListPage }  from '../../pages/record-list/record-list';
/**
 * Generated class for the DashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {
	dashboard:any;
  constructor(public servicesProvider:AioneServicesProvider,public navCtrl: NavController, public navParams: NavParams) {
  }
  ionViewDidLoad() {
    this.servicesProvider.SelectAll("settings").then((result:any)=>{
    	this.dashboard=result.rows[0];
    	console.log(this.dashboard);
    })
  }	
  recordList(){
    this.navCtrl.setRoot(RecordListPage);
  }
  listSurvey(){
  	this.navCtrl.setRoot(ListsurveyPage);
  }

}
