import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ViewController} from 'ionic-angular';
import { QuestionPage } from '../../pages/question/question';
import {GroupsPage} from '../../pages/groups/groups';
import { AioneServicesProvider } from '../../providers/aione-services/aione-services';
import { LoadingController } from 'ionic-angular';
import { AioneHelperProvider } from '../../providers/aione-helper/aione-helper';
@IonicPage()
@Component({
  selector: 'page-incompleted-survey',
  templateUrl: 'incompleted-survey.html',
})
export class IncompletedSurveyPage {
	survey:any;
	incomplete:any;
  EmptySurvey:any;
    loader:any;
  constructor(public viewCtrl: ViewController,public AioneHelp:AioneHelperProvider,private loaderCtrl:LoadingController,public navCtrl: NavController, public servicesProvider:AioneServicesProvider,public navParams: NavParams) {
  }
  ionViewDidLoad() {
     console.log(this.navParams.get('id'));
    //this.survey=this.navParams.get('result');
    // let data = this.survey.filter((element, index) =>{
    // 	return (element.survey_status == 'incomplete');
    // });
   this.checkSurvey(); 
    
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
      this.servicesProvider.SelectAll(tablename).then((result:any)=>{
        this.servicesProvider.mobileListArray(result).then((resultParse:any)=>{
          this.checkSurveyDetail(resultParse.length).then((sur:any)=>{
            console.log(resultParse.length);
            if(resultParse.length>0){
             this.incomplete=resultParse;
             this.loader.dismiss(); 
              console.log(this.incomplete);
            }else{
              this.incomplete=resultParse;
              console.log("no record found"); 
              this.viewCtrl.dismiss(); 
               this.loader.dismiss(); 
               this.AioneHelp.presentToast("Sorry, there is no incompleted survey found",10000,'top')
              this.EmptySurvey=null;
            }
           })       
        });
      });
    })
    
  }
  resume(record){
  	console.log(record);
  	console.log(record.survey_status);  
    localStorage.setItem("totalQuestion", record.totalQuestions);  
    localStorage.setItem("completedGroups", record.completed_groups);
    localStorage.setItem("record_id", record.serialNo);
    localStorage.setItem("Groupid", record.last_group_id);
    localStorage.setItem("questionIndex", record.questionIndex);

    this.groupCompleteCheck(record).then(()=>{
       // console.log(  record.last_fieldId);
     record.last_fieldId++;
     record.filledQuestions++;
     // console.log(  record.last_fieldId);
     localStorage.setItem("fillingQuestion", record.filledQuestions);
    localStorage.setItem("lastquestionIndex", record.last_fieldId.toString());
    this.navCtrl.setRoot(QuestionPage, {'id': record.last_group_id,'InCompleteStatus':"incompleteSurvey"});
    })
 
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
  deleteDetails(id){
    console.log(id);
    let query='Delete  from surveyResult_'+localStorage.getItem("Surveyid") + " where serialNo="+id;
    console.log(query);
    this.servicesProvider.ExecuteRun(query,[]).then((del:any)=>{
          this.checkSurvey();

                                                                                                        
    
     
    });
  }
  checkSurveyDetail(totalNo){
    return new Promise((resolve,reject)=>{
      console.log(totalNo);
      console.log(totalNo);
      let data=JSON.parse(localStorage.getItem("currentSurvey"));
      console.log(data["incompleted"]);
      data["incompleted"]=totalNo;
      console.log(data);
      localStorage.setItem("currentSurvey",JSON.stringify(data));
      resolve("data");

    })
  }

}
