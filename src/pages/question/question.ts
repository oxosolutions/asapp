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
    this.id=this.navParams.get('id');
    this.servicesProvider.SelectWhere("questions","group_id",this.id).then((result:any)=>{
      //this.questions.push(result.rows);
      console.log(result.rows);
      // this.questions=result.rows;
      let values=[];
      console.log(typeof(this.questions));
     for (var key in result.rows) {
    this.questions.push(result.rows[key])
}
console.log(this.questions);



      //mynew coding
       this.questions.forEach((valuedd,keydd)=>{
          let dataset=[];
        dataColumns=[];
        Object.keys(valuedd).forEach(function(keyvalue,keydata){
          let json;
          let anotherjson
           console.log(valuedd[keyvalue]);
          // if(typeof valuedd[keyvalue]=="object"){
          //   json=JSON.parse(valuedd[keyvalue]);
          //   // json=anotherjson.replace(/"/g, "'");
          // }else{
          //   json=valuedd[keyvalue];
          // }
          // dataset.push(json);
          // dataColumns.push(keyvalue);
        });
        insertContent.push(dataset);
        //  console.log(insertContent);
       });
        this.textData(this.questions[0],i).then(()=>{
         // console.log(this.questions[0]);
        })                                                                                                                                                   
    })
  }
  textData(questions,i){
     return new Promise((resolve,reject)=>{
    //   console.log(questions[0]);
    //    questions.forEach((value,key)=>{
    //      console.log(value[i]);
    //      console.log(value[i][key]);
    //      console.log(value[i][value]);
    //        if(typeof value[i]=="object"){
    //         // anotherjson=JSON.stringify(valuedd[keyvalue]);
    //         console.log("object");
            
    //       }else{
            
    //       }
    //       this.OriginalContent=value[i]; 
    //       if(this.OriginalContent.idss==1 ){
    //         this.previousButton=false;
    //       }else{
    //         this.previousButton=true;
    //       }
    //       let hh=questions[0].length;
    //       // console.log(hh);
    //       // console.log(i);
    //       if(hh == i+1 ){
    //         this.NextButton=false;
    //       }else{
    //         this.NextButton=true;
    //       }
    //     }); 

     })   
  }
  next(id){
    let questionLength;
    questionLength=this.questions[0].length;
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
    questionLength=this.questions[0].length;
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
