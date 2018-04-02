import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the IncompletedSurveyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-incompleted-survey',
  templateUrl: 'incompleted-survey.html',
})
export class IncompletedSurveyPage {
	survey:any;
	incomplete:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  ionViewDidLoad() {
    this.survey=this.navParams.get('result');
    let data = this.survey.filter((element, index) =>{
    		return (element.survey_status == 'incomplete');
    });
    this.incomplete=data;
    console.log(this.incomplete);
  }
  resume(id,group){
  	
  	console.log(id);
  	console.log(group);
  }

}
