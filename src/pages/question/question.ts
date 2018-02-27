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
  OriginalContent:any;
  dataUrl:any;
	questionTitle:any;
	id:any;
	questions=[];
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
  ionViewDidLoad() {
    let single;
    this.questionTitle=localStorage.getItem("ApplicationName");
    this.id=this.navParams.get('id');
    this.servicesProvider.SelectWhere("questions","group_id",this.id).then((result:any)=>{
      this.questions.push(result.rows);
      console.log(this.questions);
      this.questions.forEach((value,key)=>{
        
        let i;
        this.textData(value,0).then(()=>{
        })
       
      });                                                                                                                                                        
    })
  }
  textData(result,i){
    let promise = new Promise((resolve,reject)=>{
      if(result[i] != undefined){
        console.log(result[i]);
        this.questionsResult(result[i]).then(()=>{
          i = i+1;
          return resolve (this.textData(result,i));
        })
      }else{
        console.log("else data");
      }
    });
    return promise;
  }
  questionsResult(data){
    return new Promise((resolve,reject)=>{
      this.OriginalContent=data;
       
    })
  }
  next(){
    console.log("next");
  }
  // validation(data){
  //   return new Promise((resolve,reject)=>{
  //     data.question_type = data.question_type;
  //           switch (data.question_type) {
  //             case "text":

  //               console.log(data.question_type);
  //               //console.log(data);
  //               this.clickNext(data,"select").then(()=>{

  //               });
  //               break;
  //             case "select":
  //               console.log("select");
  //               break;
  //             default:
  //             console.log("your default data");
  //           }
  //   })
  // }
  // clickNext(Originaldata, type){
  //   this.OriginalContent=Originaldata;
  //   this.dataUrl=type;
  //   //this.dataUrl=type+'/'+type+'.html';
  //   console.log(this.dataUrl);
  //   console.log(this.OriginalContent);
  //   return new Promise ((resolve,reject)=>{

  //   })
  // }


}
