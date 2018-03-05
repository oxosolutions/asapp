import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {GroupsPage} from '../../pages/groups/groups';
import { AioneServicesProvider } from '../../providers/aione-services/aione-services';
import { AlertController } from 'ionic-angular';
import { DashboardPage } from '../../pages/dashboard/dashboard';
import { TextPage }  from '../../pages/text/text';
import { SelectPage } from '../../pages/select/select';
import { AioneHelperProvider } from '../../providers/aione-helper/aione-helper';
import {ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-question',
  templateUrl: 'question.html',
})
export class QuestionPage {
  answer:{};
  OriginalContent:any;
  dataUrl:any;
	questionTitle:any;
	id:any;
	questions=[];
  previousButton:any;
  NextButton:any;
  myData: any;
  subData: any;
  questionType:any;
  surveyQuestion=[];

  constructor(public toastctrl: ToastController,public AioneHelp:AioneHelperProvider,public alertCtrl: AlertController,public servicesProvider:AioneServicesProvider,public navCtrl: NavController, public navParams: NavParams) {
  }
  showConfirm() {
  	let prompt = this.alertCtrl.create({
      message: "Enter Incomplete Survey Name",
      inputs: [
        {
          placeholder: 'survey name'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            
          }
        },
        {
          text: 'Save',
          handler: data => {
          	if(data[0] == ""){

          	}else{
          		 this.navCtrl.setRoot(DashboardPage);
            		console.log(data);
          	}        
          }
        }
      ]
    });
    prompt.present();
  }
  ionViewDidLoad(){
    let i=0;
    let insertContent=[];
    this.questionTitle=localStorage.getItem("ApplicationName");
    this.questionType=localStorage.getItem("questionType");
    this.id=this.navParams.get('id');

    this.servicesProvider.SelectWhere("questions","group_id",this.id).then((result:any)=>{
      console.log(typeof(result.rows.length));
      this.questions=result.rows;
      console.log(this.questions);
      console.log(typeof(this.questions));


      // for(var key in result.rows) {
      //   console.log(result.rows[key]);
      //   this.questions.push(result.rows[key]);
      // }
      // console.log(this.questions.length);
      // console.log(typeof(this.questions));


      if(this.questionType == "save_survey"){
        this.surveyQuestion=this.questions;
        console.log(this.surveyQuestion);    
      }else if(this.questionType == "save_section"){

      }else if(this.questionType == "questions"){
        this.textData(this.questions, i).then(()=>{
        })  
      }    
    })
  }
  surveyBasedQuestion(questions){
    return new Promise((resolve,reject)=>{
      console.log(questions);
    })
  }
  textData(questions,i){
    return new Promise((resolve,reject)=>{
          console.log(questions[i]);
          this.OriginalContent=questions[i]; 
          if(this.OriginalContent.serialNo==1 ){
            this.previousButton=false;
          }else{
            this.previousButton=true;
          }
    });   
  }
  next(id){
    console.log(id);
    let toast=this.toastctrl.create({
        message:'Your Enquiry is Submitted',
        duration:4000,
        position:'top',
    });
    let questionLength;
    questionLength=this.questions.length;
    if(id==questionLength){
      toast.present();
      this.navCtrl.setRoot(DashboardPage);
    }else{
      console.log(id);
      this.textData(this.questions,id).then(()=>{
      });   
    }
  }
  
  previous(id){
    console.log(id);
    id=id-2;
    console.log(id);
    let questionLength;
    questionLength=this.questions.length;
    if(id==questionLength){
      console.log("there is no data");
      this.navCtrl.setRoot(DashboardPage);
    }else{
      console.log(id);
      this.textData(this.questions,id).then(()=>{
      });   
    }
  }
  onSubmit(formData,id){
    if(!formData.valid){
        console.log("not valid");
    }else{
      console.log("valid");
      this.next(id);
      console.log(formData.value);
    }
    formData.reset();   
  }
}
