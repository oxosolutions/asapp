import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {GroupsPage} from '../../pages/groups/groups';
import { AioneServicesProvider } from '../../providers/aione-services/aione-services';
import { AlertController } from 'ionic-angular';
import { DashboardPage } from '../../pages/dashboard/dashboard';
import { TextPage }  from '../../pages/text/text';
import { SelectPage } from '../../pages/select/select';
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

  constructor(public alertCtrl: AlertController,public servicesProvider:AioneServicesProvider,public navCtrl: NavController, public navParams: NavParams) {
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
    let single;
    let i=0;
    let insertContent=[];
    let dataColumns;
    let anotherjson;

    this.questionTitle=localStorage.getItem("ApplicationName");
    this.questionType=localStorage.getItem("questionType");
    this.id=this.navParams.get('id');

    this.servicesProvider.SelectWhere("questions","group_id",this.id).then((result:any)=>{
      for(var key in result.rows) {
        this.questions.push(result.rows[key])
      }
      console.log(this.questions);
      if(this.questionType == "save_survey"){
        this.surveyQuestion=this.questions;
        console.log(this.surveyQuestion);
          
      }else if(this.questionType == "save_section"){
        this.sectionBasedQuestion().then(()=>{

        }) 
      }else if(this.questionType == "questions"){
        this.textData(this.questions,i).then(()=>{
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
          // let hh=questions.length;
          // // console.log(hh);
 
          // if(hh == i+1 ){
          //   this.NextButton=false;
          // }else{
          //   this.NextButton=true;
          // }
        });   
  }
  next(id){
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
  previous(id){
    id=id-2;
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
