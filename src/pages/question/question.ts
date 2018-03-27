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

@IonicPage()
@Component({
  selector: 'page-question',
  templateUrl: 'question.html',
})
export class QuestionPage {
  form: FormGroup;
   // @ViewChild('myForm') myForm;
  parentMessage = "message from parent";
  //message:string;

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
  sDefaultEmail:string;
  QuestionKeyText:any;
  textAnswer:any;


  constructor(public fb: FormBuilder,public toastctrl: ToastController,public AioneHelp:AioneHelperProvider,public alertCtrl: AlertController,public servicesProvider:AioneServicesProvider,public navCtrl: NavController, public navParams: NavParams) {
    // this.sDefaultEmail = "fatherName123";
    setTimeout(function(){
      console.log(this.QuestionKeyText = 'test');
    },2000);


   

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


      //code for converting json 
      let collection;
      let newcollection; 
      let replacedArray=[]
      Content.forEach((key,value)=>{
        collection=[];
        Object.keys(key).forEach(function(keyvalue,keydata){
          //console.log(keyvalue);
          newcollection=[];
          let  newcolumn=[];
          collection=key[keyvalue];
         // console.log(collection);
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
      this.QuestionKeyText=this.questions[this.indexArray].question_key;
       this.form = new FormGroup({
      fatherName: new FormControl(),
      // Country: new FormControl()
    })
      console.log(this.QuestionKeyText);
      this.textData(this.questions, this.indexArray, this.QuestionKeyText).then(()=>{
      });
    })
  }

  textData(questions,i,questionKey){
    // console.log(i);
    return new Promise((resolve,reject)=>{
      this.QuestionKeyText=questionKey;
      //console.log(this.QuestionKeyText);

      this.OriginalContent=questions[i]; 
      this.OriginalContent.prefill = '';
      if(this.questionCheck.length==0){
        this.previousButton=false;
      }else{
        this.previousButton=true; 
      }
      let questionLength=this.questions.length;
      if(this.questionCheck.length == (questionLength-1)){
        this.NextButton=false;
      }else{
        this.NextButton=true;
      }
    });   
  }


  next(id,tablename,questionKey,formValue){
   // console.log(id);
    localStorage.setItem("lastquestionIndex", id);
    this.questionIndex(id).then((id)=>{      
      this.indexArray++;
       this.QuestionKeyText=this.questions[this.indexArray].question_key;
      this.textData(this.questions,this.indexArray,this.QuestionKeyText).then(()=>{
      }); 
    })  
  }

  questionIndex(check){
    return new Promise ((resolve,reject)=>{
      this.questionCheck.push(check);
      localStorage.setItem( "questionIndex", JSON.stringify(this.questionCheck));
      resolve("index");
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
        this.textData(this.questions,this.indexArray, answerKey).then(()=>{
        }); 
      })    
  }
  answerGet(id){
    return new Promise ((resolve,reject)=>{
      let query='SELECT '+this.questions[id].question_key +" FROM "+ this.tablename;
      this.servicesProvider.ExecuteRun(query,[]).then((result:any)=>{
        this.answerValue=result.rows.item(0);
        resolve(this.answerValue[this.questions[id].question_key]);
      });
    })
  }
  previousData(){
    return new Promise((resolve,reject)=>{
      resolve("pre data");
    });
  }
  onSubmit2(form){
     console.log(form.value);
  }

  onSubmit(form,questionKey,survey_id,questionText,QuestionType){
    console.log(form.value);
    let i=0;
    let json;
    if(!form.valid){
      this.Errors="it is not valid";
    }else{
      let formValue=[];
      //console.log(formData.value);

      if(QuestionType=="checkbox"){
        //console.log(QuestionType);
         json=JSON.stringify(form.value);
         formValue.push(json);
      }else{
        console.log(form.value);
        console.log(questionText);
        formValue.push(form.value[questionText]);
        form.value[questionText]="";
      } 
      this.tablename="surveyResult_"+survey_id;
      let query="Select "+ questionKey +" from " + this.tablename ;
      console.log(query);
      this.servicesProvider.ExecuteRun(query,[]).then((result:any)=>{
        if(result.rows.item.length < 1 ){

          console.log("empty");
          this.servicesProvider.Insert(this.tablename,questionKey,formValue).then((questionSave)=>{
           // console.log(questionSave);
            this.next(this.indexArray,this.tablename,questionKey,formValue);
          });
        }else{
           console.log("update");
          let query="UPDATE "+ this.tablename + " SET " + questionKey +"= '" +formValue +"'";
          this.servicesProvider.ExecuteRun(query,[]).then((questionSave33)=>{
            this.next(this.indexArray,this.tablename,questionKey,formValue);
          });
        }
      }); 
    }
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
