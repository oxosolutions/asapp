import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AioneHelperProvider } from '../../providers/aione-helper/aione-helper';
import { AioneServicesProvider } from '../../providers/aione-services/aione-services';
import {ListsurveyPage} from '../../pages/listsurvey/listsurvey';
import { RecordListPage }  from '../../pages/record-list/record-list';
import { QuestionPage } from '../../pages/question/question';
import {SynchronizeRecordPage} from '../../pages/synchronize-record/synchronize-record';
declare var jquery:any;
declare var $ :any;
@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {
	dashboard:any;
  ApplicationName:any;
  constructor(public servicesProvider:AioneServicesProvider,public navCtrl: NavController, public navParams: NavParams) {
  }
  // title = 'abgular 4 with jquery';
  // toggleTitle(){
  //   $('.title').slideToggle(); //
  // } 
  ionViewDidLoad() {
    this.servicesProvider.SelectAll("settings").then((result:any)=>{
    	this.dashboard=result.rows.item(0);
      console.log(this.dashboard);
      localStorage.setItem("ApplicationName", this.dashboard.android_application_title);
       localStorage.setItem('InCompleteSurveyName',null);
    });
  }	
  recordList(){
    this.navCtrl.setRoot(RecordListPage);
  }
  listSurvey(){
  	this.navCtrl.setRoot(ListsurveyPage);
  }
  synchronizeRecord(){
    this.navCtrl.setRoot(SynchronizeRecordPage);
  }

}
