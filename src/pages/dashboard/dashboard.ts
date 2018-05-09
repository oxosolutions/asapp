import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AioneHelperProvider } from '../../providers/aione-helper/aione-helper';
import { AioneServicesProvider } from '../../providers/aione-services/aione-services';
import {ListsurveyPage} from '../../pages/listsurvey/listsurvey';
import { RecordListPage }  from '../../pages/record-list/record-list';
import { QuestionPage } from '../../pages/question/question';
import {SynchronizeRecordPage} from '../../pages/synchronize-record/synchronize-record';
import {ProfilePage} from '../../pages/profile/profile';
import {SurveyPopUpPage} from '../../pages/survey-pop-up/survey-pop-up';
import {AboutPage} from '../../pages/about/about';
import {UpdatePage} from '../../pages/update/update';
import { Events } from 'ionic-angular';
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
  username:any;
  userEmail:any;
  constructor(public events: Events,public servicesProvider:AioneServicesProvider,public navCtrl: NavController, public navParams: NavParams) {
  }
  ionViewDidLoad() {
    let userId=localStorage.getItem("userId");
    this.servicesProvider.SelectWhere("users",'id', userId).then((result:any)=>{
      console.log(result.rows.item(0));
      let data=result.rows.item(0);
      this.events.publish('user:created', data); 
      this.servicesProvider.SelectAll("settings").then((result:any)=>{
      	this.dashboard=result.rows.item(0);
        console.log(this.dashboard); 
        localStorage.setItem("ApplicationName", this.dashboard.android_application_title);
         localStorage.setItem('InCompleteSurveyName',null);
      });
    })
  }	
  userInfo(id){
    console.log(id);
    return new Promise ((resolve,reject)=>{
     
    })
  }
  userProfile(){
    this.navCtrl.push(ProfilePage);
  }
  recordList(){
    this.navCtrl.setRoot(RecordListPage);
  }
  listSurvey(){
  	this.navCtrl.setRoot(ListsurveyPage);
  }
  synchronizeRecord(){
    this.navCtrl.push(SynchronizeRecordPage);
  }
  aboutPage(){
    this.navCtrl.push(AboutPage)
  }
  update(){
    this.navCtrl.push(UpdatePage);
  }

}
