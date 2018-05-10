import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import {QuestionPage} from '../../pages/question/question';
import { DashboardPage } from '../../pages/dashboard/dashboard';

@IonicPage()
@Component({
  selector: 'page-survey-pop-up',
  templateUrl: 'survey-pop-up.html',
})
export class SurveyPopUpPage {
  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController) {
  	 		
  }
  ionViewDidLoad(){
	  this.dismiss();
  }
  dismiss() {
  	var elem = this;
  	setTimeout(function(){
	 	 elem.viewCtrl.dismiss();
	 	  //elem.navCtrl.setRoot(DashboardPage);
      // this.navCtrl.setRoot(DashboardPage);
	  },1000);

  }
 

}
