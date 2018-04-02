import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-completed-survey',
  templateUrl: 'completed-survey.html',
})
export class CompletedSurveyPage {
	survey:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.survey=this.navParams.get('result');
    let data = this.survey.filter((element, index) =>{
    		return (element.survey_status == 'completed');
    });
    console.log(data);


  }

}
