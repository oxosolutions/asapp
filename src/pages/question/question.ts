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

      this.questions.forEach((value,key)=>{
        // Object.keys(value).forEach((qvalues,qkeys)=>{
        //     single=value[qkeys]
        //     this.textData(value[qkeys]).then(()=>{
        //       console.log(value[qkeys]);
        //     });
        // });
        // console.log(single);
        // for(let j=0; j < value.length;){
        //   console.log(value[j]);
        //   this.textData(value[j],j).then(()=>{

        //   })
        // }
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
        this.validation(result[i]).then(()=>{
          i = i+1;
          return resolve (this.textData(result,i));
        })
      }else{
        console.log("else data");
      }
    });
    return promise;
  }
  validation(data){
    return new Promise((resolve,reject)=>{
      data.question_type = data.question_type;
            switch (data.question_type) {
              case "text":
                console.log(data.question_type);
                console.log(data);
                this.navCtrl.setRoot(TextPage, {'value' : data })
                 break;
              case "select":
                console.log("select");
                break;
              default:
              console.log("your default data");
              }
              
      //resolve(data);
    })
  }


}
