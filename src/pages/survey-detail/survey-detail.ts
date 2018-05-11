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
import { LoadingController } from 'ionic-angular';
@IonicPage()
@Component({
  selector: 'page-survey-detail',
  templateUrl: 'survey-detail.html',
})
export class SurveyDetailPage {
  surveyDetail:any;
   nullSurvey;
  EmptySurvey:any;
      loader:any;
  constructor(private loaderCtrl:LoadingController,public AioneHelp:AioneHelperProvider,public toastCtrl: ToastController,public servicesProvider:AioneServicesProvider,public alertCtrl: AlertController,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.loader = this.loaderCtrl.create({
      spinner: 'crescent',
      content: `
      <div class="custom-spinner-container">
        <div class="custom-spinner-box">`+'Refreshing data'+`</div>
      </div>`,
    });
    this.surveyDetail = JSON.parse(localStorage.getItem("currentSurvey"));
    this.loader.dismiss();
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
              this.AioneHelp.presentToast("Pls fill record name", 1000 ,'top');
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
      duration: 1500,
      showCloseButton:true,
      closeButtonText: 'Ok'
    });
    toast.present();
  }
  groups(id,message,totalQuestions){
    this.surveyIncompleteName().then(()=>{
    this.navCtrl.setRoot(GroupsPage,{'id': id});  
     });
  }
  
  completedSurveyPage(id,incompleteRecord){
    if(incompleteRecord > 0){
        this.navCtrl.setRoot(CompletedSurveyPage, {'id':id});  
    }else{
        this.AioneHelp.presentToast("Sorry, there is no survey found",500,'top')
    }
  }
  syncronizePage(id,synchronize){
    console.log(synchronize);
    if(synchronize > 0){
        this.navCtrl.setRoot(SynchronizeSinglePage, {'id':id});  
    }else{
        this.AioneHelp.presentToast("Sorry, there is no survey found",500,'top')
    }
  }
  incompletedSurveyPage(id,incompleteRecord){
    console.log(incompleteRecord);
    if(incompleteRecord > 0){
      this.navCtrl.setRoot(IncompletedSurveyPage, {'id' : id});
    }else{
      this.AioneHelp.presentToast("Sorry, there is no survey found",500,'top')
    }
  }
  surveyIncompleteName(){
    console.log("incomplete name");
    return new Promise ((resolve,reject)=>{
      this.showConfirm().then((dd)=>{
        resolve(dd);
      });
    })
  }
  // syncronizePage(){  
  // 	this.navCtrl.setRoot(SynchronizeSinglePage);
  // }
  incompletePage(){
  	this.navCtrl.push(CompletedSurveyPage); 
  }
}
