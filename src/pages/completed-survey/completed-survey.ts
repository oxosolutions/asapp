import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { QuestionPage } from '../../pages/question/question';
import {GroupsPage} from '../../pages/groups/groups';

@IonicPage()
@Component({
  selector: 'page-completed-survey',
  templateUrl: 'completed-survey.html',
})
export class CompletedSurveyPage {
	survey:any;
  complete:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }
  ionViewDidLoad() {
    this.survey=this.navParams.get('result');
    let data = this.survey.filter((element, index) =>{
    		return (element.survey_status == 'completed');
    });
    this.complete=data;
    console.log(this.complete);
  }
  resume(record){
    // console.log(record);
    // console.log(record.survey_status);
    // record.filledQuestions++;
    localStorage.setItem("totalQuestion", record.totalQuestions);
    // localStorage.setItem("fillingQuestion", record.filledQuestions);
    localStorage.setItem("completedGroups", record.completed_groups);
    localStorage.setItem("record_id", record.serialNo);
    localStorage.setItem("Groupid", record.last_group_id);
    localStorage.setItem("questionIndex", record.questionIndex);

    
   // this.groupCompleteCheck(record).then(()=>{
       // console.log(  record.last_fieldId);
     //record.last_fieldId++;
     // console.log(  record.last_fieldId);
    localStorage.setItem("lastquestionIndex", record.last_fieldId);
    this.navCtrl.setRoot(GroupsPage, {'completed': "surveyCompleted"});
    //})
 
  }
  groupCompleteCheck(record){
    return new Promise((resolve,rejeect)=>{
      if(record.completed_groups != "null"){
        // console.log(  record.last_fieldId);
        // console.log("groupo null");
        if(record.last_fieldId == null ){
          // console.log("go to groupss");
          this.navCtrl.setRoot(GroupsPage);
        }else{
          resolve("data");
        }

      }else{
        resolve("data");
      }
    })
  }

}
