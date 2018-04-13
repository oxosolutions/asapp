import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {SynchronizeSinglePage} from '../../pages/synchronize-single/synchronize-single';
import { CompletedSurveyPage } from '../../pages/completed-survey/completed-survey';
import { IncompletedSurveyPage } from '../../pages/incompleted-survey/incompleted-survey';
import { AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { AioneHelperProvider } from '../../providers/aione-helper/aione-helper';
import { AioneServicesProvider } from '../../providers/aione-services/aione-services';
import {GroupsPage} from '../../pages/groups/groups';

@IonicPage()
@Component({
  selector: 'page-survey-detail',
  templateUrl: 'survey-detail.html',
})
export class SurveyDetailPage {
  surveyDetail:any;
   nullSurvey;
  EmptySurvey:any;
  constructor(public AioneHelp:AioneHelperProvider,public toastCtrl: ToastController,public servicesProvider:AioneServicesProvider,public alertCtrl: AlertController,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.surveyDetail = this.navParams.get("survey");
    console.log(this.surveyDetail);
  }
  showConfirm() {
    return new Promise((resolve,reject)=>{
    let prompt = this.alertCtrl.create({
      message: "Enter Your record name",
      inputs: [
        {
          placeholder: 'Record name'
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
              this.AioneHelp.presentToast("Pls fill record name", 2000 ,'top');
            }else{
              console.log(data[0]);
              localStorage.setItem("InCompleteSurveyName",data[0]);
              resolve(data[0]);
            }        
          }
        }
      ]
    });  
    prompt.present();
    })
  }
  presentToast(){
    let toast = this.toastCtrl.create({
      message: 'Survey is not available',
      duration: 5500,
      showCloseButton:true,
      closeButtonText: 'Ok'
    });
    toast.present();
  }
  groups(id,message,totalQuestions){
    this.navCtrl.setRoot(GroupsPage,{'id': id});  
  }
  checkSurvey(id){
    console.log(id);
    return new Promise((resolve,reject)=>{
      let tablename="surveyResult_"+id;
      this.servicesProvider.SelectAll(tablename).then((result:any)=>{
        this.servicesProvider.mobileListArray(result).then((resultParse:any)=>{
          if(resultParse.length>0){
            resolve(resultParse)
          }else{
            console.log("no record found");  
            this.EmptySurvey=null;
          }
        });
      });
    })
    
  }
  completedSurveyPage(id){
    this.checkSurvey(id).then((result:any)=>{
        this.navCtrl.push(CompletedSurveyPage, {'result':result});
        
    });
   
  }
  incompletedSurveyPage(id){
    this.checkSurvey(id).then((result:any)=>{
      this.navCtrl.push(IncompletedSurveyPage, {'result' : result});
    });
  }
  surveyIncompleteName(){
    console.log("incomplete name");
    return new Promise ((resolve,reject)=>{
      this.showConfirm().then((dd)=>{
        resolve(dd);
      });
    })
  }
  syncronizePage(){  
  	this.navCtrl.setRoot(SynchronizeSinglePage);
  }
  incompletePage(){
  	this.navCtrl.push(CompletedSurveyPage); 
  }
}
