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
  constructor(public servicesProvider:AioneServicesProvider,public navCtrl: NavController, public navParams: NavParams) {
  }
  questionid(id){
    console.log(this.surveyType);
    if(this.surveyType=="section"){
       this.navCtrl.push(SectionalQuestionsPage,{'id': id});
    }else{
        this.navCtrl.setRoot(QuestionPage, {'id': id});
    }
  
  }
  ionViewDidLoad() {
    this.groupTitle=localStorage.getItem("ApplicationName");
    this.ids=this.navParams.get('id');
    this.surveyType=this.navParams.get('type');
    console.log(this.surveyType);
    console.log(this.ids);
    this.servicesProvider.SelectWhere("groups","survey_id",this.ids).then((result:any)=>{
      //console.log(result.rows.item);
      let rowww=[];
      rowww = result.rows.item(i)
      console.log(result.rows);
      var row = [];
      for(var i=0; i < result.rows.length; i++) {
            row[i] = result.rows.item(i)
      }
      let SurveyData = row;
      this.groupsResult=SurveyData;
      console.log( this.groupsResult);

      // let elem = this;
      
      // setTimeout(function(){
      //   elem.groupsResult=SurveyData;
      //   console.log( elem.groupsResult);
     
      // }, 1000);
        
    	//console.log(this.groupsResult);
      // this.servicesProvider.SelectWhere("survey_meta","form_id",this.ids).then((form:any)=>{
      //   for(var keys in form.rows){
      //     if(form.rows[keys].value == "survey"){
      //       localStorage.setItem("questionType", 'save_survey');
      //     }else if(form.rows[keys].value == "section"){
      //       localStorage.setItem("questionType", 'save_section');
      //     }else if(form.rows[keys].value == "question"){
      //       localStorage.setItem("questionType", 'questions');
      //     }
      //     }
      //   })
      });
   
  }

}
