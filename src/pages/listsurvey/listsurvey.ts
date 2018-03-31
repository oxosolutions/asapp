import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AioneServicesProvider } from '../../providers/aione-services/aione-services';
import {GroupsPage} from '../../pages/groups/groups';
import { AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-listsurvey',
  templateUrl: 'listsurvey.html',
})
export class ListsurveyPage {
	dashboard:any;
	surveyTitle:any;
	listSurvey = [];
	data:any;
	questionLength=[];
	nullSurvey;
	ExpireTime:any;
	StartTime:any;
	ExpireDate:any;
	StartDate:any;
	date:any;
	currentDate:any;
	currentTime:any;

	today:any;
	tomarrow:"14/03/2018 17:23:41 +0530";
  constructor(public toastCtrl: ToastController,public servicesProvider:AioneServicesProvider,public alertCtrl: AlertController,public navCtrl: NavController, public navParams: NavParams) {
  }
  groups(id,message){
  	localStorage.setItem("Surveyid", id);
  	
  	let surveyMetaType;
  	if(message["scheduling"].surveyResponse == "true"){
  		this.servicesProvider.SelectWhere("survey_meta","form_id",id).then((form:any)=>{
  		console.log(form);
  			//console.log(form.rows.item);
  			var row = {};
      	for(var i=0; i < form.rows.length; i++) {
          	row[i] = form.rows.item(i)
      	}
       	let SurveyData = row;
        for(let keys in SurveyData){

          if(SurveyData[keys].value == "survey"){
          	surveyMetaType=SurveyData[keys].value;
            localStorage.setItem("questionType", 'save_survey');
            
          }else if(SurveyData[keys].value == "section"){
          	surveyMetaType=SurveyData[keys].value;
            localStorage.setItem("questionType", 'save_section');
            this.navCtrl.setRoot(GroupsPage,{'type' : surveyMetaType,'id': id});
          }else if(SurveyData[keys].value == "question"){
          	surveyMetaType=SurveyData[keys].value;
            localStorage.setItem("questionType", 'questions');
            this.navCtrl.setRoot(GroupsPage,{'type' : surveyMetaType,'id': id});

          }
         }
      });
  	}else{
  		this.presentToast();
  	}
  	//this.showConfirm();
  	
  }
  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Survey is not available',
      duration: 5500,
      showCloseButton:true,
      closeButtonText: 'Ok'
    });
    toast.present();
  }
	ionViewDidLoad(){  
		console.log("ion view load");
		this.surveyTitle=localStorage.getItem("ApplicationName");
  		localStorage.setItem('completedGroups',undefined);
  		// localStorage.setItem('ContinueKey',undefined);
  		localStorage.setItem('RuningSurvey',null);
  		localStorage.setItem('record_id',null);
  		localStorage.setItem('GroupNumber',null);
  		localStorage.setItem('totalGroup',null);
		this.EnabledSurvey();
		
	}
	EnabledSurvey(){
		let questionId;
		let questionData:any;
		let metaSurvey=[];
		let SurveySelect=[];
		return new Promise((resolve,reject)=>{
			let query='Select * from survey_meta where key = "enable_survey" AND value = 1';
			this.servicesProvider.ExecuteRun(query,[]).then((survey_meta:any)=>{
				metaSurvey.push(survey_meta.rows);
				if(survey_meta.rows.length > 0){
				let forloop=0;
				metaSurvey.forEach((value,key)=>{
					let content=[];
					//value.length;
					for(let i=0; i < value.length; i++){
						this.surveyScheduling(value.item(i).form_id).then((surveySch : any)=>{
								this.servicesProvider.SelectWhere("surveys","id",value.item(i).form_id).then((survey:any)=>{ console.log(survey);
									this.responseLimit(value.item(i).form_id).then((responseData:any)=>{
										this.surveytimer(value.item(i).form_id).then((timerData:any)=>{
											// console.log(surveySch);
											let rowsData = survey.rows.item(0);
											rowsData["details"]=responseData;
											rowsData["timer"]=timerData;
											rowsData["scheduling"]=surveySch;
										// console.log(rowsData["details"].responenumber);
											content.push(rowsData);	
											console.log(content);
										})	
												
								});	
							});					
						});
						if(content != undefined){
							SurveySelect.push(content);
							forloop++;
							if(forloop == survey_meta.rows.item.length ){
								this.listSurvey=SurveySelect;
								console.log(this.listSurvey);
							}
						}
					}

				});
			}else{
				this.nullSurvey="there is no survey";
				console.log(this.nullSurvey);
			}
		  });
		})
	}
	customError(formId){
		return new Promise ((resolve,reject)=>{
			let query='select * from survey_meta where key="custom_error_messages" AND value=1 AND form_id = '+formId;
			this.servicesProvider.ExecuteRun(query,[]).then((data:any)=>{
				if(data.rows.length > 0){
					//console.log("error exists");
				}else{
					//console.log("no error");
				}
			});
		})
	}
	surveyScheduling(formId){
		return new Promise((resolve,reject)=>{
				let startdate;
				let expiredate;
				let starttime;
				let expiretime;
				let date;
				let time;
				let noSuceduling;
				let survey_scheduling='select * from survey_meta where key="survey_scheduling" AND value=1 AND form_id = '+formId;
				this.today = new Date();
				//console.log(this.today);
				this.servicesProvider.ExecuteRun(survey_scheduling,[]).then((scheduling:any)=>{
					if(scheduling.rows.length > 0){
						//console.log("yes survey schelduling");
								this.servicesProvider.MultipleSelectWhere("survey_meta","key","'start_date'","form_id",formId).then((startDate:any)=>{
									this.servicesProvider.MultipleSelectWhere("survey_meta","key","'expire_date'","form_id",formId).then((expiredate:any)=>{
										this.servicesProvider.MultipleSelectWhere("survey_meta","key","'survey_start_time'","form_id",formId).then((startTime:any)=>{	
											this.servicesProvider.MultipleSelectWhere("survey_meta","key","'survey_expire_time'","form_id",formId).then((expireTime:any)=>{
												this.caseCondtions(startDate.rows.item(0).value, expiredate.rows.item(0).value, startTime.rows.item(0).value, expireTime.rows.item(0).value).then((caseResult:any)=>{ 
													this.caseValidations(startDate.rows.item(0).value, expiredate.rows.item(0).value, startTime.rows.item(0).value, expireTime.rows.item(0).value,caseResult).then((collection:any)=>{
														// console.log(collection);
														resolve(collection);
													});	
												});												
											});
										});
									});
								});

					}else{
						noSuceduling="it has no scheduling";
						//console.log(noSuceduling);
						let collection1={};
						collection1["surveyResponse"]="false";
						collection1["message"]="survey not available";
						resolve(collection1);
					}	
				});
		});
	}

	private caseValidations(startdate,expiredate,starttime,expiretime,ConditionResult){
		return new Promise((resolve,reject)=>{
			console.log(ConditionResult);
			let message;
			let surveyResponse;
			
			//start time when user starts like 14:35:14
			let s=starttime.split(":");
			var StartTime = new Date(this.today.getFullYear(), this.today.getMonth(),
	                   this.today.getDate(),parseInt(s[0]), parseInt(s[1]));

			//expire time when user expires
			var e = expiretime.split(':');
			var ExpireTime = new Date(this.today.getFullYear(), this.today.getMonth(),
	                   this.today.getDate(),parseInt(e[0]), parseInt(e[1]));
			//console.log(ExpireTime);
			
			// getting current time
			var dateString3 = this.today.toString();
			var a = dateString3.split(" ");
			var Currenttime = a[4];

			switch (ConditionResult){
				case "case A":
					let dateDataA=new Date(expiredate);
					if(dateDataA >= this.today){
						message="survey is visible";
						surveyResponse="true";
					}else{
						message="survey not available";
						surveyResponse="false";

					}
					break;
				
				case "case B":
					let dateDataB= new Date(startdate);
					let EDate = new Date(expiredate);
					console.log(startdate); console.log(expiredate);
					if(this.today >= dateDataB && this.today <= EDate){
						message="survey is visible";
						surveyResponse="true";
					}
					else{
						message="survey not available";
						surveyResponse="false";
					}
					break;

				case "case C":
					let dateDataC=new Date(startdate);
					console.log(startdate);
					if(this.today >= dateDataC){
						message="survey is visible";
						surveyResponse="true";
					}else{
						message="survey not available";
						surveyResponse="false";
					}
					break;

				case "case D":
					if(this.today >= StartTime && this.today <= ExpireTime){
						message="survey available";
						surveyResponse="true";
					}else{
						message="survey not available";
							surveyResponse="false";
					}
					break;


				case "case E":
					if(this.today >= StartTime){
						message="survey available";
						surveyResponse="true";
					}else{
						message="survey not available";
						surveyResponse="false";
					}
					//console.log(message);
					break;


				case "case F":
					if(this.today <= ExpireTime){
						message="survey available";
						surveyResponse="true";
					}else{
						message="survey not available";
						surveyResponse="false";
					}
					
					break;


				case "case G":
					let dateDataG=new Date(startdate);
					let eExpireDate=new Date(expiredate);
					let sTime=starttime;
					break;

				case "case H":
					let finish= "23:59:59";
					let dateDataH = new Date(startdate);
					let ExpireDateH = new Date(expiredate);
					let dt=starttime.split(":");
					let lastdateExpire= new Date(ExpireDateH.getFullYear(),ExpireDateH.getMonth(), ExpireDateH.getDate()+1);
					if(this.today >= dateDataH && this.today <= lastdateExpire && Currenttime >=starttime && Currenttime <= finish){
						message="survey available";
						surveyResponse="true";
					}else{
						message="survey not available";
						surveyResponse="false";
					}
				break;

				case "case I":
					var startStringTime = "00:00:01";
					let dateDataI = new Date(startdate);
					let ExpireDateI = new Date(expiredate);
					let lastdateExpireI= new Date(ExpireDateI.getFullYear(),ExpireDateI.getMonth(), ExpireDateI.getDate()+1);
					if(this.today >= dateDataI && this.today <= lastdateExpireI && Currenttime >=startStringTime && Currenttime <= expiretime){
						message="survey available";
						surveyResponse="true";
					}else{
						message="survey not available";
						surveyResponse="false";
					}
				break;

				case "case J":
					let dateDataj = new Date(startdate);
					if(this.today >= dateDataj && Currenttime >= starttime &&  Currenttime <= expiretime){
						message="survey available";
							surveyResponse="true";
					}else{
							message="survey not available";
							surveyResponse="false";
					}
					break;

				case "case K":
					let ExpireDateK = new Date(expiredate);
					let lastdateExpireK= new Date(ExpireDateK.getFullYear(),ExpireDateK.getMonth(), ExpireDateK.getDate()+1);
					if(this.today <= lastdateExpireK && Currenttime <= expiretime){
						message="survey available";
						surveyResponse="true";
					}else{
							message="survey not available";
							surveyResponse="false";
					}
        break;

				case "case L":
					var startStringTimeL = "23:59:59";
					let ExpireDateL = new Date(expiredate);
					let lastdateExpireL= new Date(ExpireDateL.getFullYear(),ExpireDateL.getMonth(), ExpireDateL.getDate()+1);
					if(this.today <= lastdateExpireL && Currenttime  >= starttime && Currenttime <= startStringTimeL){
						message="survey available";
						surveyResponse="true";
					}else{
						message="survey not available";
						surveyResponse="false";	
					}
				break;

				case "case M":
						message="survey is available";
						surveyResponse="true";	
					
				break;

				case "case N":
					let ExpireDateN = new Date(expiredate);
					let lastdateExpireN= new Date(ExpireDateN.getFullYear(),ExpireDateN.getMonth(), ExpireDateN.getDate()+1);
					console.log(lastdateExpireN);			
					if(this.today <= lastdateExpireN && Currenttime  >= starttime && Currenttime <= expiretime){
						message="survey available";
						surveyResponse="true";
					}else{
						message="survey not available";
						surveyResponse="false";	
					}
				break;
			}

			let collection1={};
					collection1["surveyResponse"]=surveyResponse;
					collection1["message"]=message;
					resolve(collection1);
		});
	}
	caseCondtions(startdate,expiredate,starttime,expiretime){
		return new Promise((resolve,reject)=>{
			if(startdate == "" && expiredate != "" && starttime == "" && expiretime=="" ){
				console.log(expiredate);
				resolve ("case A"); // only have expiredate;
			}
			if(startdate != "" && expiredate != "" && starttime == "" && expiretime=="" ){
				resolve ("case B"); //have startdate and expiredate
			}
			if(startdate != "" && expiredate == "" && starttime == "" && expiretime=="" ){
				resolve ("case C"); //have startdate
			}	
			if(startdate == "" && expiredate == "" && starttime != "" && expiretime != "" ){
				resolve ("case D"); //have starttime,expiretime
			}
			if(startdate == "" && expiredate == "" && starttime != "" && expiretime == "" ){
				resolve ("case E"); //have starttime;
			}
			if(startdate == "" && expiredate == "" && starttime == "" && expiretime !="" ){
				resolve ("case F"); // have expire time
			}
			if(startdate != "" && expiredate != "" && starttime != "" && expiretime != "" ){
				
				resolve ("case G"); //have startdate, expiredate, starttime
			}
			if(startdate != "" && expiredate != "" && starttime != "" && expiretime == "" ){
				resolve ("case H");  //have startdate,expiredate,starttime
			}
			if(startdate != "" && expiredate != "" && starttime == "" && expiretime != "" ){
				resolve ("case I"); //startdate,expiredate,expiretime
			}
			if(startdate != "" && expiredate == "" && starttime != "" && expiretime != "" ){
				resolve ("case J"); //startdate,startime,expiretime
			}
			if(startdate 	== "" && expiredate != "" && starttime == "" && expiretime != "" ){
				resolve ("case K"); //expiredate,expiretime
			}
			if(startdate == "" && expiredate != "" && starttime != "" && expiretime == "" ){
				resolve ("case L"); //have expiredate,starttime	
			}
			if(startdate == "" && expiredate == "" && starttime == "" && expiretime == "" ){
				resolve ("case M");	 //expiredate ,expiretime startdate starttime
			}
			if(startdate == "" && expiredate != "" && starttime != "" && expiretime != "" ){
				resolve ("case N");	 //expiredate ,starttime expiretime
			}
				// starttime,startdate
			//also M case pending



			
		});
	}
	responseLimit(formId){
		return new Promise ((resolve,reject)=>{
			let responenumber:any;
			let responsetype:any;
			let query='select * from survey_meta where key="survey_response_limit" AND value=1 AND form_id = '+formId;
			this.servicesProvider.ExecuteRun(query,[]).then((data:any)=>{
				if(data.rows.length > 0){
						//console.log("response dffdexits");
						this.servicesProvider.MultipleSelectWhere("survey_meta","key","'response_limit'","form_id",formId).then((num:any)=>{
							responenumber=num.rows.item(0).value;
							this.servicesProvider.MultipleSelectWhere("survey_meta","key","'response_limit_type'","form_id",formId).then((type:any)=>{
								if(type.rows.item(0).value=="per_user"){
									responsetype=type.rows.item(0).value;
								}else{
									responsetype=type.rows.item(0).value;
								}
								let responseResult=this.sruveyResponseExecution(responenumber,responsetype);
								resolve(responseResult);
							});
						});
				}else{
					// console.log("no limit selected");
					responenumber="";
					responsetype="";
					let responseResult=this.sruveyResponseExecution(responenumber,responsetype);
					resolve(responseResult);
				}
			});
		})
	}
	sruveyResponseExecution(responenumber,responsetype){
		let collectionResponse={};
		collectionResponse["responenumber"]=responenumber;
		collectionResponse["responsetype"]=responsetype;
		//console.log(collectionResponse)
		return collectionResponse;
	}
	surveytimer(formId){
		return new Promise ((resolve,reject)=>{
			let duration
			//console.log(formId);
			let timerType;
			let query='select * from survey_meta where key="survey_timer" AND value=1 AND form_id = '+formId;
			this.servicesProvider.ExecuteRun(query,[]).then((data:any)=>{
				if(data.rows.length > 0){
					//console.log("timer extis");
					this.servicesProvider.MultipleSelectWhere("survey_meta","key","'survey_duration'","form_id",formId).then((dur:any)=>{
					this.servicesProvider.MultipleSelectWhere("survey_meta","key","'timer_type'","form_id",formId).then((type:any)=>{
						if(type.rows.item(0).value == "survey_duration"){
							timerType=type.rows.item(0).value;
							duration=dur.rows.item(0).value;
						}else{
							timerType=type.rows.item(0).value;
							duration="";
						}
					
						let timerData=this.surveytimerExecution(timerType,duration);
						resolve(timerData);
					});
						
					});
					
				}else{
					//console.log("no timer");
					timerType="";
					duration="";
					let timerData=this.surveytimerExecution(timerType,duration);
					resolve(timerData);
				}
			});
		});
	}
	surveytimerExecution(timerType,duration){
		let collectionResponse={};
		collectionResponse["timerType"]=timerType;
		collectionResponse["timerDuration"]=duration;
		//.console.log(collectionResponse)
		return collectionResponse;
	}

}

		

// questionCount(){

	//this.surveytimer(formId).then((surveyTim)=>{
												// 	resolve(surveyTim);
												// 	this.responseLimit(formId).then((limit)=>{
												// 	});
												// })



// 	// this.data="SELECT  questions.question_key,surveys.* FROM surveys LEFT JOIN questions ON surveys.id = questions.survey_id";
// 			// this.servicesProvider.ExecuteRun(this.data,[]).then((SelResult:any)=>{
// 			// 	this.questionLength.push(SelResult.rows);
// 			// 	this.listSurvey.forEach((key,value,)=>{
// 			// 		this.questionLength.forEach((keys,values,)=>{
// 			// 			Object.keys(key).forEach(function(svalue,skey){
// 		 //    			questionData=key[svalue].id;																																																								 
// 		 //    			//console.log(questionData);		    				
// 		 //    			});
		    			 						
// 	  // 			});
// 			// 	});
// 			// });
// }

