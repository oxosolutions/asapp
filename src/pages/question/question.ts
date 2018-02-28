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
    let i=0;
    this.questionTitle=localStorage.getItem("ApplicationName");
    this.id=this.navParams.get('id');
    this.servicesProvider.SelectWhere("questions","group_id",this.id).then((result:any)=>{
      this.questions.push(result.rows);
       this.textData(this.questions,i).then(()=>{

       })                                                                                                                                                   
    })
  }
  textData(questions,i){
    return new Promise((resolve,reject)=>{
       questions.forEach((value,key)=>{
        console.log(value[i]);
        this.OriginalContent=value[i];
        }); 
    })
      
      
  }
  next(id){
    let questionLength;
    console.log(id);
    console.log(this.questions);
    questionLength=this.questions[0].length;
    console.log();
    if(id==questionLength){
      console.log("there is no data");
      this.navCtrl.setRoot(DashboardPage);
    }else{
      this.textData(this.questions,id).then(()=>{
      });   
    }
  }
}
