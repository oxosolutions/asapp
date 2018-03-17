import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GroupsPage } from '../../pages/groups/groups';
import { QuestionPage } from '../../pages/question/question';
import { SurveyProvider } from '../../providers/survey/survey';


@IonicPage()
@Component({
  selector: 'page-text',
  templateUrl: 'text.html',
})
export class TextPage {
	public data:any;
  constructor( public surveyProvider:SurveyProvider,public navCtrl: NavController, public navParams: NavParams) {
  }
  ionViewDidLoad() {
    // this.data=this.navParams.get("value");
    console.log("text");  
  }
  next(){
 		// console.log(this.data);
 		// this.surveyProvider.questionsid(this.data);
  	
  }

}
