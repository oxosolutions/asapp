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

@IonicPage()
@Component({
  selector: 'page-question',
  templateUrl: 'question.html',
})
export class QuestionPage {
   @ViewChild(TextPage) child;
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
  constructor(public toastctrl: ToastController,public AioneHelp:AioneHelperProvider,public alertCtrl: AlertController,public servicesProvider:AioneServicesProvider,public navCtrl: NavController, public navParams: NavParams) {
    // this.sDefaultEmail = "fatherName123";
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
          console.log(keyvalue);
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
      this.textData(this.questions, this.indexArray, this.QuestionKeyText).then(()=>{
      });
    })
  }

  textData(questions,i,questionKey){
    // console.log(i);
    return new Promise((resolve,reject)=>{
      this.QuestionKeyText=questionKey;
      console.log(this.QuestionKeyText);
      this.OriginalContent=questions[i]; 
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
    console.log(id);
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
  

  // previous(id){
  //   console.log(id);

  //   id=id-2;
  //   console.log(id);
  //   let questionLength;
  //   questionLength=this.questions.length;

  //   if(id==questionLength){
  //     console.log("there is no data");
  //     this.navCtrl.setRoot(DashboardPage);
  //   }else{
  //     console.log(id);
  //     this.textData(this.questions,id).then(()=>{
  //     });   
  //   }
  // }
  // 
  // 

 

  onSubmit(formData,questionKey,survey_id,questionText,QuestionType){
    
    let i=0;
    let json;
    if(!formData.valid){
       //console.log("not valid");
        this.Errors="it is not valid";
    }else{
      let formValue=[];
      //console.log(formData.value);

      if(QuestionType=="checkbox"){
        //console.log(QuestionType);
         json=JSON.stringify(formData.value);
         formValue.push(json);
      }else{
        //c//onsole.log(formData.value);
        //console.log(questionText);
        formValue.push(formData.value[questionText]);
        formData.value[questionText]="";
      }
      //console.log(formValue);
     // console.log(this.indexArray);  
      this.tablename="surveyResult_"+survey_id;
      let query="Select "+ questionKey +" from " + this.tablename ;
      //console.log(query);
      this.servicesProvider.ExecuteRun(query,[]).then((result:any)=>{
        //console.log(result.rows);
        //console.log(result.rows.length);
       console.log(this.indexArray);
        if(result.rows.length < 1 ){

          console.log("empty");
          this.servicesProvider.Insert(this.tablename,questionKey,formValue).then((questionSave)=>{
           // console.log(questionSave);
            this.next(this.indexArray,this.tablename,questionKey,formValue);
          });
        }else{
         // console.log("update");
          let query="UPDATE "+ this.tablename + " SET " + questionKey +"= '" +formValue +"'";
          //console.log(query);
          this.servicesProvider.ExecuteRun(query,[]).then((questionSave33)=>{
            this.next(this.indexArray,this.tablename,questionKey,formValue);
          });
        }
      }); 
    }
    formData.reset();   
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
