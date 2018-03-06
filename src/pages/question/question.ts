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
    let Content=[];
    this.questionTitle=localStorage.getItem("ApplicationName");
    this.questionType=localStorage.getItem("questionType");
    this.id=this.navParams.get('id');

    this.servicesProvider.SelectWhere("questions","group_id",this.id).then((result:any)=>{
      Content.push(result.rows);

      //code for converting json 
      let collection;
      let newcollection; 
      let replacedArray=[]
      Content.forEach((key,value)=>{
        collection=[];
        Object.keys(key).forEach(function(keyvalue,keydata){
          newcollection=[];
          let  newcolumn=[];
          collection=key[keyvalue];
          //console.log(collection);
          Object.keys(collection).forEach(function(valuekey,valuedata){
            let newData;
            let replace;
            try{
              replace=collection[valuekey].replace(/'/g,'"');
              newData = JSON.parse(replace);
            }catch(e){
              newData = collection[valuekey];
            }
            newcollection.push(newData);
            newcolumn.push(valuekey); 
          })
          let replacedData={};
          i;
          for(i=0; i< newcollection.length; i++){
            replacedData[newcolumn[i]]=newcollection[i];
          }
          replacedArray.push(replacedData);
        });
      });
      this.questions=replacedArray;
      console.log(this.questions);
      if(this.questions != undefined){
        if(this.questionType == "save_survey"){
          this.surveyQuestion=this.questions;
          console.log(this.surveyQuestion);    
        }else if(this.questionType == "save_section"){

        }else if(this.questionType == "questions"){
          let i=0;
          this.textData(this.questions, i).then(()=>{
          });
        }    
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
  onSubmit(formData,id,questionKey,survey_id,questionText){
    if(!formData.valid){
        console.log("not valid");
    }else{
      console.log("valid");
      let formValue=[];
      console.log(formData.value);
      formValue.push(formData.value[questionText]);
      console.log(formValue);
      let tablename="surveyResult_"+survey_id;
      //this.servicesProvider.SelectWhere(tablename,questionKey,'"'+formValue+'"').then((result:any)=>{
        //console.log(result.rows.length);
        //if(result.rows.length < 1){
          //console.log("empty");
          this.servicesProvider.Insert(tablename,questionKey,formValue).then((questionSave)=>{
            this.next(id);
         // });
       // }else{
          //console.log("should be updated");
       // }
      })
      
    }
    formData.reset();   
  }
}
