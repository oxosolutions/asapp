import { Component,Input } from '@angular/core';
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
  @Input() childMessage: any;
  @Input() childMessageone:any;
   // message: string = "Hola Mundo!"
  constructor( public surveyProvider:SurveyProvider,public navCtrl: NavController, public navParams: NavParams) {
  
  }
  ionViewDidLoad() {
    console.log("text");  
    console.log(this.childMessage);
  }
  next(){
 		// console.log(this.data);
 		// this.surveyProvider.questionsid(this.data);
  }




}
