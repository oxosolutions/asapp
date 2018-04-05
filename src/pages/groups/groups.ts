import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AioneServicesProvider } from '../../providers/aione-services/aione-services';
import {ListsurveyPage} from '../../pages/listsurvey/listsurvey';
import {QuestionPage} from '../../pages/question/question';
import {SectionalQuestionsPage} from '../sectional-questions/sectional-questions';
import {SurveyQuestionsPage} from '../survey-questions/survey-questions';
import { AlertController } from 'ionic-angular';
import { AioneHelperProvider } from '../../providers/aione-helper/aione-helper';

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
  constructor(public AioneHelp:AioneHelperProvider,public alertCtrl: AlertController,public servicesProvider:AioneServicesProvider,public navCtrl: NavController, public navParams: NavParams) {
  }
  questionid(id,serialNo){
    // this.showConfirm();
   localStorage.setItem("Groupid", id);
   this.completedSurvey().then((resutlcomplete)=>{
     console.log(resutlcomplete);
      if(this.surveyType=="section"){
       this.navCtrl.push(SectionalQuestionsPage,{'id': id});
      }else{  
        localStorage.setItem( "lastquestionIndex", ""+ 0 +"");
        this.navCtrl.setRoot(QuestionPage, {'id': id,'completed': resutlcomplete }); 
      }
   })
     
  }
  completedSurvey(){
    return new Promise ((resolve,reject)=>{
      if(this.navParams.get("completed") !=  null){
        console.log("review record check");
        resolve(this.navParams.get("completed"));
      }else{
        console.log("emply only questions");
        resolve("");
      }
    })
  }
  showConfirm() {
    let prompt = this.alertCtrl.create({
      message: "Enter Incomplete Survey Name",
      inputs: [
        {
          placeholder: 'survey name'
        },
      ],
      buttons:[
        {
          text: 'Cancel',
          handler: data => {
            
          }
        },
        {
          text: 'Save',
          handler: data => {
            if(data[0] == ""){
              this.AioneHelp.presentToast("you must fill survey name",2000,'top');
            }else{
              
         
            }        
          }
        }
      ]
    });  
    prompt.present();
  }
  ionViewDidLoad() {
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
  }
  getCSSClasses(someValue){
    if(localStorage.getItem('completedGroups') != null){
      localStorage.setItem("lastquestionIndex", ""+null+"");
      if(localStorage.getItem('completedGroups').indexOf(someValue)== -1)
        return "ll";
      else  
        return "completed"; 
    }else{
      return "dfdf";
    } 
  }

}
