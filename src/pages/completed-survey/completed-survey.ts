import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import { QuestionPage } from '../../pages/question/question';
import {GroupsPage} from '../../pages/groups/groups';
import { AioneServicesProvider } from '../../providers/aione-services/aione-services';
import { LoadingController } from 'ionic-angular';
import { AioneHelperProvider } from '../../providers/aione-helper/aione-helper';
import {SurveyDetailPage} from '../../pages/survey-detail/survey-detail';

@IonicPage()
@Component({
  selector: 'page-completed-survey',
  templateUrl: 'completed-survey.html',
})
export class CompletedSurveyPage {
	survey:any;
  complete:any;
    EmptySurvey:any;
    loader:any;
  constructor(public viewCtrl: ViewController,public servicesProvider:AioneServicesProvider,public AioneHelp:AioneHelperProvider,private loaderCtrl:LoadingController,public navCtrl: NavController, public navParams: NavParams) {

  }
  ionViewDidLoad() {
     this.checkSurvey(); 
  }
   backToDetails(){
    this.navCtrl.setRoot(SurveyDetailPage);
  }
  checkSurvey(){
    console.log(this.navParams.get('id'));
    return new Promise((resolve,reject)=>{
       this.loader = this.loaderCtrl.create({
      spinner: 'crescent',
      content: `
      <div class="custom-spinner-container">
        <div class="custom-spinner-box">`+'Refreshing data'+`</div>
      </div>`,
    });
    this.loader.present(); 
      let tablename="surveyResult_"+this.navParams.get('id');
      this.servicesProvider.SelectWhere(tablename,"survey_status","'completed'").then((result:any)=>{
        this.servicesProvider.mobileListArray(result).then((resultParse:any)=>{
          this.checkSurveyDetail(resultParse.length).then((sur:any)=>{
          console.log(resultParse);
          if(resultParse.length>0){
           this.complete=resultParse;
           this.loader.dismiss(); 
            console.log(this.complete);
          }else{
            this.complete=resultParse;
            console.log("no record found"); 
            this.navCtrl.setRoot(SurveyDetailPage);
             this.loader.dismiss(); 
             this.AioneHelp.presentToast("Sorry, there is no completed survey found",15000,'top')
            this.EmptySurvey=null;
          }
        });
        });
      });
    })
    
  }
  deleteDetails(id){
    console.log(id);
    let query='Delete  from surveyResult_'+localStorage.getItem("Surveyid") + " where serialNo="+id;
    console.log(query);
    this.servicesProvider.ExecuteRun(query,[]).then((del:any)=>{
      this.checkSurvey();
     
    });
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
  checkSurveyDetail(totalNo){
    return new Promise((resolve,reject)=>{
      let data=JSON.parse(localStorage.getItem("currentSurvey"));
      data["completed"]=totalNo;
      console.log(data);
      localStorage.setItem("currentSurvey",JSON.stringify(data));
      resolve("data");

    })
  }

}
