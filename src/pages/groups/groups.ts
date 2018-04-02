import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AioneServicesProvider } from '../../providers/aione-services/aione-services';
import {ListsurveyPage} from '../../pages/listsurvey/listsurvey';
import {QuestionPage} from '../../pages/question/question';
import {SectionalQuestionsPage} from '../sectional-questions/sectional-questions';
import {SurveyQuestionsPage} from '../survey-questions/survey-questions';

@IonicPage()
@Component({
  selector: 'page-groups',
  templateUrl: 'groups.html',
})
export class GroupsPage {
  groupTitle:any;
	ids:any;
	groupsResult:any;
  surveyType:any;
  //recordId:any;
  constructor(public servicesProvider:AioneServicesProvider,public navCtrl: NavController, public navParams: NavParams) {
  }
  questionid(id,serialNo){
    
    localStorage.setItem("Groupid", id);
    if(this.surveyType=="section"){
       this.navCtrl.push(SectionalQuestionsPage,{'id': id});
    }else{
        this.navCtrl.setRoot(QuestionPage, {'id': id}); 
    }
  }
  ionViewDidLoad() {
    this.groupTitle=localStorage.getItem("ApplicationName");
    
    //this.ids=this.navParams.get('id');
    this.ids=localStorage.getItem('Surveyid');
    this.surveyType=localStorage.getItem('questionType');
    this.servicesProvider.SelectWhere("groups","survey_id",this.ids).then((result:any)=>{
      //console.log(result.rows.item);
      let rowww=[];
      rowww = result.rows.item(i)
      //console.log(result.rows);
      var row = [];
      for(var i=0; i < result.rows.length; i++) {
        row[i] = result.rows.item(i)
      }
      let SurveyData = row;
      this.groupsResult=SurveyData;
      console.log( this.groupsResult);
      localStorage.setItem("totalGroup",this.groupsResult.length);

      // var number1 = 400;
      // var number2 = 500;
      // console.log(Math.floor((number1 / number2) * 100)); //w00t!
      });
   
  }

}
