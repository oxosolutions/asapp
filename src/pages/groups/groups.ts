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
  completedGroup:any;
  navdata:any;
  local:any;
  dragContent:any;
  //recordId:any;
  constructor(public servicesProvider:AioneServicesProvider,public navCtrl: NavController, public navParams: NavParams) {
  }
  questionid(id,serialNo){
    
    localStorage.setItem("Groupid", id);
    if(this.surveyType=="section"){
       this.navCtrl.push(SectionalQuestionsPage,{'id': id});
    }else{
      
      localStorage.setItem("lastquestionIndex", ""+ 0 +"");
        this.navCtrl.setRoot(QuestionPage, {'id': id}); 

    }
  }
  ionViewDidLoad() {
     console.log(this.navParams.get('status'));
    this.groupCheckStatus().then(()=>{
      this.groupTitle=localStorage.getItem("ApplicationName");
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
      });
    }) 
  }
  groupCheckStatus(){
    return new Promise((resolve,reject)=>{
    if(this.navParams.get('status') != null){
      this.navdata=this.navParams.get('status');
      // this.completeGroupCheck().then(()=>{
         console.log(this.navdata);
      resolve(this.navdata);
    //  })
     
    }else{
      resolve("hh");
    }
    })
  }
  completeGroupCheck(someValue){
    return new Promise((resolve,reject)=>{
      // this.completedGroup=this.navParams.get('completedGroup');
      this.local=localStorage.getItem('completedGroup');
      console.log(this.local);
      for(let i=0; i<=this.local.length; i++){
        console.log(this.local[i]);
        if(someValue == this.local[i])
          return "completed"
         // else if(someValue == 207)
         //     return "completed";
        else
             return "notsame";
      }

     
      resolve(this.completedGroup);
    })
  }
  getCSSClasses(someValue){
    if(this.navParams.get('completedGroup') != null){
      if(localStorage.getItem('completedGroups').indexOf(someValue)== -1)
        return "ll";
      else  
        return "completed"; 
    }else{
      return "dfdf";
    } 
  }

}
