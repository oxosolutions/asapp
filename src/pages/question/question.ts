import { Component,ViewChild, AfterViewInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {GroupsPage} from '../../pages/groups/groups';
import { AioneServicesProvider } from '../../providers/aione-services/aione-services';
import { AlertController } from 'ionic-angular';
import { DashboardPage } from '../../pages/dashboard/dashboard';
import { TextPage }  from '../../pages/text/text';
import { SelectPage } from '../../pages/select/select';
import { AioneHelperProvider } from '../../providers/aione-helper/aione-helper';
import {ToastController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup, NgForm, FormControl} from '@angular/forms';
import { DatepickerOptions } from 'ng2-datepicker';
import * as enLocale from 'date-fns/locale/en';
import * as frLocale from 'date-fns/locale/fr';

@IonicPage()
@Component({
  selector: 'page-question',
  templateUrl: 'question.html',
})
export class QuestionPage {
  form: FormGroup;
   // @ViewChild('myForm') myForm;
  parentMessage = "message from parent";
  //message:string
  date: Date;
  options: DatepickerOptions = {
    locale: enLocale
  };
  //   date: Date;
  // options: DatepickerOptions = {
  //   locale: frLocale,
  // };
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
  Errors:any;
  questionCheck=[];
  indexArray=0;
  lastPopId:any;
  tablename:any;
  answerValue:string;
  sDefaultEmail:any;
  QuestionKeyText:any;
  textAnswer:any;
  formValidate:any;
  recordId:any;  

  

  constructor(public fb: FormBuilder,public toastctrl: ToastController,public AioneHelp:AioneHelperProvider,public alertCtrl: AlertController,public servicesProvider:AioneServicesProvider,public navCtrl: NavController, public navParams: NavParams) {
    this.date = new Date();
    
  }
  showConfirm(questionKey,survey_id,questionText,QuestionType) {
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
              console.log(data[0]);
            this.tablename="surveyResult_"+survey_id;
            let formValue="incomplete_name";
            this.servicesProvider.Insert(this.tablename,questionKey,formValue).then((questionSave)=>{
               this.navCtrl.setRoot(DashboardPage);
                  console.log(data);
            });
        
              
            }        
          }
        }
      ]
    });  
    prompt.present();
  }
  ngAfterViewInit() {
    // this.message = this.child.message
  }
  ionViewDidLoad(){
    let i=0;
    let Content=[];
    this.questionTitle=localStorage.getItem("ApplicationName");
    this.questionType=localStorage.getItem("questionType");

    this.id=this.navParams.get('id');
    this.servicesProvider.SelectWhere("questions","group_id",this.id).then((result:any)=>{
      Content.push(result.rows);
      console.log(Content);

      //code for converting json 
      let collection;
      let newcollection; 
      let replacedArray=[];
      let newObject={};
      Content.forEach((key,value)=>{
        collection=[];
        Object.keys(key).forEach(function(keyvalue,keydata){
          //console.log(keyvalue);
          newcollection=[];
          let  newcolumn=[];
          collection=key[keyvalue];
          newObject[collection.question_text]="";
          
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
     // console.log(this.questions);
      this.QuestionKeyText=this.questions[this.indexArray].question_key;
      //console.log(newObject);

     //create dynamic 
    const form: FormGroup = new FormGroup({});
    for (const key in newObject) {
      if (newObject.hasOwnProperty(key)) {
        const control: FormControl = new FormControl("" , Validators.required);
        form.addControl(key, control);
      }
    }
    this.form = form;
    //end 
    
    console.log(this.QuestionKeyText);
      this.textData(this.questions, this.indexArray, "").then(()=>{
      });
    })
  }

  textData(questions,i,questionKey){
    // console.log(i);
    return new Promise((resolve,reject)=>{
      this.QuestionKeyText=questionKey;
      let content=[]
      content=questions[i]; 
      content["prefill"]=questionKey;
      this.OriginalContent = content ;
      console.log(this.OriginalContent);
      if(this.questionCheck.length==0){
        this.previousButton=false;
      }else{
        this.previousButton=true; 
      }
      this.NextButton=true;
      
    });   
  }


  next(surveyid,questionkey){
    this.tablename="surveyResult_"+surveyid;
      localStorage.setItem("lastquestionIndex", this.indexArray.toString());
      let questionLength=this.questions.length;
      console.log(localStorage.getItem('Groupid'));
      if(this.questionCheck.length == (questionLength-1)){
        this.NextButton=false;
         let query="UPDATE "+ this.tablename + " SET completed_groups = '" + localStorage.getItem('Groupid') +"'"+" where serialNo = "+localStorage.getItem('record_id');
          this.servicesProvider.ExecuteRun(query,[]).then((questionSave33)=>{
            this.AioneHelp.presentToast("section is successfully completed", 3000,'top');
            this.navCtrl.setRoot(GroupsPage);
         });
        
      }else{
        this.questionIndex(this.indexArray).then((id)=>{  
          this.indexArray++;
          this.answerGet(this.indexArray).then((answerKey:any)=>{
            this.textData(this.questions,this.indexArray,answerKey).then(()=>{
            }); 
        }); 
      })
    }
  }

  questionIndex(check){
    return new Promise ((resolve,reject)=>{
      this.questionCheck.push(check);
      localStorage.setItem( "questionIndex", JSON.stringify(this.questionCheck));
      resolve(this.questionCheck);
    })
  }
  previous(){
    let storedNames:any;
    storedNames = JSON.parse(localStorage.getItem("questionIndex"));
    this.lastPopId= storedNames.pop();
    let lastindex2=this.lastPopId-1;
    this.questionCheck=storedNames;
    localStorage.setItem( "questionIndex", JSON.stringify(this.questionCheck)); 
    localStorage.setItem("lastquestionIndex", ""+lastindex2+"");
    this.indexArray=this.indexArray-1;
    this.QuestionKeyText=this.questions[this.indexArray].question_key;
    this.answerGet(this.indexArray).then((answerKey:any)=>{
      console.log(answerKey);
      this.textData(this.questions,this.indexArray, answerKey).then(()=>{
      }); 
    })    
  }
  answerGet(id){
    return new Promise ((resolve,reject)=>{
      let query='SELECT '+this.questions[id].question_key +" FROM "+ this.tablename+" where serialNo = "+localStorage.getItem('record_id'); ;
      this.servicesProvider.ExecuteRun(query,[]).then((result:any)=>{
        this.answerValue=result.rows.item(0);
        resolve(this.answerValue[this.questions[id].question_key]);
      });
    })
  }
  onSubmit(form,questionKey,survey_id,questionText,QuestionType){
    //console.log(this.form.value);
    
    console.log(this.recordId);
    console.log(this.form.value[questionText]);
    let i=0;
    let json;
    let formValue=[];
    this.formValidate=this.form.controls[questionText].valid;
    if(!this.formValidate){
      //console.log("not valid");
      this.Errors="it is not valid";
    }else{
      let formValue=[];
     //console.log("valid");
      if(QuestionType=="checkbox"){
        json=JSON.stringify(this.form.value);
        formValue.push(json);
      }else{
        formValue.push(form.value[questionText]);
        // formValue.push(this.recordId);
        form.value[questionText]="";
      } 
      let questionLength=this.questions.length;
      this.tablename="surveyResult_"+survey_id;
      let query="Select "+ questionKey +" from " + this.tablename + " where serialNo = "+this.recordId ;
      //this.servicesProvider.ExecuteRun(query,[]).then((result:any)=>{
      let record_id:any
      record_id = localStorage.getItem('record_id');
      console.log(record_id);
      if(record_id != "null"){
        console.log('update')
        let query="UPDATE "+ this.tablename + " SET " + questionKey +"= '" +formValue +"'"+" where serialNo = "+localStorage.getItem('record_id') ;
          console.log(query);
          this.servicesProvider.ExecuteRun(query,[]).then((questionSave33)=>{
            this.next(survey_id,questionKey);
          });
          
        }else{
          console.log('insert');
          this.servicesProvider.Insert(this.tablename, [questionKey], formValue).then((res:any)=>{
            console.log(res.insertId);
            localStorage.setItem('record_id', res.insertId);
            this.next(survey_id,questionKey);
          });
        }
    //  }); 
       }
    //}
    form.reset();   
  }

  insertSubmit(tablename,questionKey,formValue){
    return new Promise((resolve,rejct)=>{
      this.servicesProvider.Insert(tablename,questionKey,formValue).then((questionSave33)=>{
        resolve(questionSave33);
      });
    })
  }

  updateCucumber() {
    let  cucumber:any
    console.log('Cucumbers new state:' + cucumber);
  }
}
