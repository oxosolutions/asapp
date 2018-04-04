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
  section:any;
  navdata:any;
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
      console.log(this.navdata);
      resolve(this.navdata);
    }else{
      if(this.section == 'section'){
        console.log("yes match");
      }else{
        console.log("not match");
      }
      console.log("djkfhkdf");
      resolve("hh");
    }
    })
  }

}
