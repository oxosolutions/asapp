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
declare var jquery:any;
declare var $ :any;

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

 // indexArray=0;
  public indexArray:any=localStorage.getItem("lastquestionIndex");
  filledQuestion:any;
  lastPopId:any;
  tablename:any;
  answerValue:string;
  sDefaultEmail:any;
  QuestionKeyText:any;
  textAnswer:any;
  formValidate:any;
  recordId:any;  
  CompletedGroup=[];
  completedGroupIndex=localStorage.getItem('Groupid');
  surveyTotalQuestions:any;
     
  constructor(public fb: FormBuilder,public toastctrl: ToastController,public AioneHelp:AioneHelperProvider,public alertCtrl: AlertController,public servicesProvider:AioneServicesProvider,public navCtrl: NavController, public navParams: NavParams) {
    this.date = new Date(); 
  }
 
  showConfirm(questionKey,survey_id,questionText,QuestionType) {
    let prompt = this.alertCtrl.create({
      message: "Are u sure want to quite survey",
      // inputs: [
      //   {
      //     // placeholder: 'survey name'
      //   },
      // ],
      buttons:[
        {
          text: 'Cancel',
          handler: data => {
            
          }
        },
        {
          text: 'yes',
          handler: data => {
            // if(data[0] == ""){
              this.navCtrl.setRoot(DashboardPage);
            // }else{
          //     console.log(data[0]);
          //   this.tablename="surveyResult_"+survey_id;
          //   let formValue=data[0];
          //     let query="UPDATE "+ this.tablename + " SET " + "incomplete_name" +"= '" +formValue +"'"+" where serialNo = "+localStorage.getItem('record_id') ;
          // console.log(query);
          // this.servicesProvider.ExecuteRun(query,[]).then((questionSave33)=>{
              // this.navCtrl.setRoot(DashboardPage);
          //});
            // }        
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
    this.surveyTotalQuestions = localStorage.getItem("totalQuestion");
    this.questionTitle=localStorage.getItem("ApplicationName");
    this.questionType=localStorage.getItem("questionType");
    this.id=this.navParams.get('id');
    console.log(this.id);
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
      console.log(this.indexArray);
      this.QuestionKeyText=this.questions[this.indexArray].question_key;
      console.log(newObject);

     //create dynamic 
    const form: FormGroup = new FormGroup({});
    for (const key in newObject) {
      if (newObject.hasOwnProperty(key)){
        const control: FormControl = new FormControl(newObject[key], Validators.required);
        form.addControl(key, control);
      }
    }
    this.form = form;
    //end 
    
    //console.log(this.QuestionKeyText);
      localStorage.setItem("totalSectionQuestion",""+Content[0].length+"");
      this.surveyTotalQuestions = localStorage.getItem("totalSectionQuestion");
      this.reviewRecord().then((answer:any)=>{ 
         console.log(answer);
         this.textData(this.questions, this.indexArray, answer).then(()=>{
        });
      }) 
    })
  }
  reviewRecord(){
    return new Promise ((resolve,reject)=>{
      console.log(this.navParams.get("completed"));
      localStorage.getItem('record_id')
      if(localStorage.getItem('record_id') != "null" ){
        console.log('from ')
        this.tablename="surveyResult_"+this.questions[this.indexArray].survey_id; 
        this.answerGet(this.indexArray).then((answerKey:any)=>{
          resolve(answerKey);
        });
      }else{
        resolve("");
      }
    })
  }
  textData(questions,i,questionKey){
    return new Promise((resolve,reject)=>{
      this.lastArrayCheck().then((result:any)=>{
        //console.log(questions[i].survey_id)
        this.filledQuestion= localStorage.getItem("fillingQuestion");
      // this.next(questions[i].survey_id,questions[i].question_key);
      this.QuestionKeyText=questionKey;
      console.log(this.QuestionKeyText);
      let content=[]
      content=questions[i]; 
      content["prefill"]=this.QuestionKeyText;
      this.OriginalContent = content ;
      console.log(this.OriginalContent);
     
      if(this.questionCheck.length==0){
        this.previousButton=false;
      }else{
        this.previousButton=true; 
      }
      this.NextButton=true;
       }); 
   });   
  }
  next(surveyid,questionkey){
    console.log(this.indexArray);
    this.tablename="surveyResult_"+surveyid; 
      let questionLength=this.questions.length;
      localStorage.getItem('Groupid');
    
      if(this.questionCheck.length == (questionLength-1)){ 
        this.updateCompleteGroup().then(()=>{
          this.NextButton=false;
            let query="UPDATE "+ this.tablename + " SET completed_groups = '" + localStorage.getItem('completedGroups') +"',last_fieldId = " +null +" where serialNo = "+localStorage.getItem('record_id');
            console.log(query);
            this.servicesProvider.ExecuteRun(query,[]).then((questionSave33)=>{
              this.questionIndex(this.indexArray,questionkey).then((id)=>{
                this.questionsFilledCheck().then((fillled)=>{
                  this.questionsFilledCheckInsert().then((filledinsert)=>{
                  this.surveyComplete().then(()=>{
                   });
               });
             });
            }); 
          }); 
          
        })    
      }else{
        this.questionIndex(this.indexArray,questionkey).then((id)=>{  
          this.indexArray++;
          console.log(this.indexArray);
          this.answerGet(this.indexArray).then((answerKey:any)=>{
           this.questionsFilledCheck().then((fillled)=>{
              //this.questionsFilledCheckInsert().then((filledinsert)=>{
                this.textData(this.questions,this.indexArray,answerKey).then(()=>{
                }); 
              });
            //})
          }); 
        })
      }
  }
  questionsFilledCheckInsert(){
    return new Promise((resolve,reject)=>{
      let query="UPDATE "+ this.tablename +" SET filledQuestions='"+localStorage.getItem("fillingQuestion") +"' where serialNo= "+ localStorage.getItem('record_id');
      console.log(query);
      this.servicesProvider.ExecuteRun(query,[]).then((insert)=>{
        resolve(insert);
      })
    });
  }
  questionsFilledCheck(){
    return new Promise((resolve,reject)=>{
      // if(localStorage.getItem("fillingQuestion") == "null"){
      //   this.filledQuestion=JSON.parse(localStorage.getItem('questionIndex'));
      //   console.log(this.filledQuestion);
      //   this.filledQuestion++;
      //   localStorage.setItem("fillingQuestion",this.filledQuestion.length);
      //   resolve(this.filledQuestion);
      // }else{
        this.filledQuestion= localStorage.getItem("fillingQuestion");
        this.filledQuestion++;
        localStorage.setItem("fillingQuestion",this.filledQuestion);
        resolve(this.filledQuestion);
      //}
    })
  }
  surveyComplete(){
    return new Promise((resolve,reject)=>{
      let data=JSON.parse(localStorage.getItem('completedGroups')); 
      if(data.length == localStorage.getItem("totalGroup")){
        let time=new Date();
        console.log("datashborad pls go");
        let query="UPDATE "+this.tablename + " SET survey_status = 'completed', "+"survey_completedOn='"+ time +"'"+" where serialNo = "+localStorage.getItem('record_id');
        console.log(query);
        this.servicesProvider.ExecuteRun(query,[]).then((complete:any)=>{
           this.AioneHelp.presentToast("survey is successfully completed", 3000,'top');
           this.navCtrl.setRoot(DashboardPage);
        })
      }else{
        this.AioneHelp.presentToast("section is successfully completed", 3000,'top');
        this.navCtrl.setRoot(GroupsPage, {'completedGroup': localStorage.getItem("completedGroups")});
      }
    })
  }
  updateCompleteGroup(){
    //calculate complted groups
   
    let storedata:any;
    return new Promise((resolve,reject)=>{
      if(localStorage.getItem('completedGroups') != "null"){
        console.log(localStorage.getItem('completedGroups'));
        console.log(localStorage.getItem('Groupid'));
         
      if(localStorage.getItem('completedGroups').indexOf(""+localStorage.getItem('Groupid')+"") == -1){
        this.CompletedGroup=JSON.parse(localStorage.getItem('completedGroups'));
        this.CompletedGroup.push(localStorage.getItem('Groupid'));
        localStorage.setItem('completedGroups',JSON.stringify(this.CompletedGroup));
        resolve(this.CompletedGroup);
        }
        else{
          this.CompletedGroup=JSON.parse(localStorage.getItem('completedGroups'));
          resolve(this.CompletedGroup); 
        }
      }else{
        console.log('defined')
       
             this.CompletedGroup.push(localStorage.getItem('Groupid'));
        console.log(this.CompletedGroup);
        localStorage.setItem('completedGroups',JSON.stringify(this.CompletedGroup));
        resolve(this.CompletedGroup);
          
       
      }
    })  
  }
  questionIndex(check,questionkey){
    return new Promise ((resolve,reject)=>{
      console.log(this.questionCheck);
      console.log(check);
      this.questionCheck.push(check);
      localStorage.setItem( "questionIndex", JSON.stringify(this.questionCheck));
      let questionFilled=JSON.parse(localStorage.getItem('questionIndex'));
      console.log(questionFilled);  //list of array
      let query="UPDATE "+ this.tablename +" SET questionIndex = '"+ localStorage.getItem('questionIndex') +"' where serialNo= "+ localStorage.getItem('record_id');
       console.log(query);
      this.servicesProvider.ExecuteRun(query,[]).then((insert)=>{
        resolve(this.questionCheck);
      // resolve(query);
       })
     
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

    this.filledQuestion= localStorage.getItem("fillingQuestion");
    this.filledQuestion=this.filledQuestion-1;
    localStorage.setItem("fillingQuestion",this.filledQuestion);
    this.questionsFilledCheckInsert().then((filledinsert)=>{
    this.QuestionKeyText=this.questions[this.indexArray].question_key;
    this.answerGet(this.indexArray).then((answerKey:any)=>{
      console.log(answerKey);
      this.textData(this.questions,this.indexArray, answerKey).then(()=>{
      }); 
      }); 
    }) ;   
  }
  answerGet(id){
    console.log(id);
    return new Promise ((resolve,reject)=>{
      console.log(this.questions[id].question_key);
      let query='SELECT '+this.questions[id].question_key +" FROM "+ this.tablename+" where serialNo = "+localStorage.getItem('record_id'); 
      console.log(query);
      this.servicesProvider.ExecuteRun(query,[]).then((result:any)=>{
        this.answerValue=result.rows.item(0);
        resolve(this.answerValue[this.questions[id].question_key]);
      });
    });
  }
  lastArrayCheck(){
    return new Promise ((resolve,reject)=>{
      console.log(this.navParams.get('indexdata'));
      //  
      if(this.navParams.get('indexdata') != null || this.navParams.get('InCompleteStatus') != null){
        console.log("pearame");
        console.log(this.questionCheck);
        this.questionCheck = JSON.parse(localStorage.getItem('questionIndex'));
        console.log(this.questionCheck);
        resolve(this.questionCheck);
      }else{
        resolve("data");
      }  
    })
  }
  submitConditionCheck(value,questionText){
    return new Promise((resolve,reject)=>{
      //if different question types
      
     // console.log(value[questionText]);
      if(value[questionText] != null){
        localStorage.setItem("lastQuestiontext" ,questionText);
        if(value[questionText]==""){
          resolve(null);
        }else{
         resolve(value[questionText]);
        }   
      }else{
        //if same types
        if(value[localStorage.getItem("lastQuestiontext")] != null){
          let data=value[localStorage.getItem("lastQuestiontext")];
          resolve(data);
        }else{
          resolve(null);
        }
      }
    });
  }
  update(text){
    console.log(text);
  }
  checkbox(questionKey){
    return new Promise((resolve,reject)=>{
     var check;
$("#test-with-is").on("click", function(){
    check = $("#mycheckbox").is(":checked");
    if(check) {
      console.log("cheked");
        alert("Checkbox is checked.");
    } else {
       console.log("not cheked");
        alert("Checkbox is unchecked.");
    }
}); 
      if($('input:checked').val() != undefined){
        $('input').prop('disabled',true);
        console.log("yes checked");
      }else{
        console.log("not checked");
      }
    })
   
  }
  onSubmit(form,questionKey,survey_id,questionText,QuestionType,update){
  // console.log(this.form.value);
   this.submitConditionCheck(this.form.value,questionText).then((formValidate)=>{
    // console.log(formValidate);
    let i=0;
    let json;
    let formValue=[];
    if(formValidate == null){
      console.log("not valid");
      this.Errors="it is not valid";
    }else{
      let formValue=[];
       //console.log("valid");
      if(QuestionType=="checkbox"){
        this.checkbox(questionKey).then(()=>{

        });
        // json=JSON.stringify(formValidate);
        // formValue.push(json);
      }else{
        formValue.push(formValidate);
        //console.log(formValue);
      
      let questionLength=this.questions.length;
      this.tablename="surveyResult_"+survey_id;
       localStorage.setItem("lastquestionIndex", this.indexArray.toString());
      let query="Select "+ questionKey +" from " + this.tablename + " where serialNo = "+this.recordId ;
      let record_id:any
      record_id = localStorage.getItem('record_id');
      localStorage.setItem("lastquestionIndex", this.indexArray.toString());
      if(record_id != "null"){
        //console.log('update');
       // console.log(formValue);
          let query="UPDATE "+ this.tablename + " SET " + questionKey +"= '" +formValue +"', last_fieldId = "+"'"+ localStorage.getItem("lastquestionIndex")+"'," +"last_group_id = "+localStorage.getItem('Groupid')+",filledQuestions="+localStorage.getItem("fillingQuestion")+" where serialNo = "+localStorage.getItem('record_id') ;
          console.log(query);
          this.servicesProvider.ExecuteRun(query,[]).then((questionSave33)=>{
            this.next(survey_id,questionKey);
          });  
      }else{
          let time =new Date();
          //console.log('insert');
          formValue.push(localStorage.getItem("lastquestionIndex"));
          formValue.push("incomplete");
          formValue.push(localStorage.getItem('Groupid'));
          formValue.push(time);
          formValue.push(localStorage.getItem("totalQuestion"));
          formValue.push(localStorage.getItem("InCompleteSurveyName"))
           formValue.push(localStorage.getItem("fillingQuestion"));
          this.servicesProvider.Insert(this.tablename, [questionKey,"last_fieldId","survey_status","last_group_id","survey_startedOn","totalQuestions","incomplete_name","filledQuestions"], formValue).then((res:any)=>{
         // console.log(res.insertId);
            localStorage.setItem('record_id', res.insertId);
            localStorage.setItem('InCompleteSurveyName',null);
            this.next(survey_id,questionKey);
          });
      }
      } 
       }
      form.reset(); 
       })
    //} 
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