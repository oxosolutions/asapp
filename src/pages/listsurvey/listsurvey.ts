import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AioneServicesProvider } from '../../providers/aione-services/aione-services';
import {GroupsPage} from '../../pages/groups/groups';

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
  constructor(public servicesProvider:AioneServicesProvider,public navCtrl: NavController, public navParams: NavParams) {
  }
  groups(id){
  	this.navCtrl.setRoot(GroupsPage,{'id': id});
  }
	ionViewDidLoad(){  
		this.surveyTitle=localStorage.getItem("ApplicationName");
		
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
					for(let i=0; i < value.length; i++){

						this.surveyScheduling(value[i].form_id).then((surveySch : any)=>{
							this.servicesProvider.SelectWhere("surveys","id",value[i].form_id).then((survey:any)=>{
								console.log(survey.rows[0]);
								content.push(survey.rows[0]);			
							});						
						});
						if(content != undefined){
							SurveySelect.push(content);
							forloop++;
							if(forloop == survey_meta.rows.length ){
								this.listSurvey=SurveySelect;
								//console.log(this.listSurvey);
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
				console.log(this.today);
				this.servicesProvider.ExecuteRun(survey_scheduling,[]).then((scheduling:any)=>{
					if(scheduling.rows.length > 0){
						console.log("yes survey schelduling");
								this.servicesProvider.MultipleSelectWhere("survey_meta","key","'start_date'","form_id",formId).then((startDate:any)=>{
									this.servicesProvider.MultipleSelectWhere("survey_meta","key","'expire_date'","form_id",formId).then((expiredate:any)=>{
										this.servicesProvider.MultipleSelectWhere("survey_meta","key","'survey_start_time'","form_id",formId).then((startTime:any)=>{	
											this.servicesProvider.MultipleSelectWhere("survey_meta","key","'survey_expire_time'","form_id",formId).then((expireTime:any)=>{
												this.caseCondtions(startDate.rows[0].value, expiredate.rows[0].value, startTime.rows[0].value, expireTime.rows[0].value).then((caseResult:any)=>{
													this.caseValidations(startDate.rows[0].value, expiredate.rows[0].value, startTime.rows[0].value, expireTime.rows[0].value,caseResult).then((collection:any)=>{
														console.log(collection);
														console.log(collection.message);
														
													});
													
												})


												
											});
											
										});
									});
								});

					}else{
						noSuceduling="it has no scheduling";
						console.log(noSuceduling);

					}
					
				});
		});
	}

	/**
	 * [caseValidate description]
	 * @param {[type]} startdate  [description]
	 * @param {[type]} expiredate [description]
	 * @param {[type]} starttime  [description]
	 * @param {[type]} expiretime [description]
	 * 
	 */
	

	private caseValidations(startdate,expiredate,starttime,expiretime,ConditionResult){
		return new Promise((resolve,reject)=>{
			console.log(ConditionResult);
			let message;
			let surveyResponse;
			let s=starttime.split(":");
			var StartTime = new Date(this.today.getFullYear(), this.today.getMonth(),
	                   this.today.getDate(),parseInt(s[0]), parseInt(s[1]));
			var e = expiretime.split(':');
			var ExpireTime = new Date(this.today.getFullYear(), this.today.getMonth(),
	                   this.today.getDate(),parseInt(e[0]), parseInt(e[1]));
			console.log(StartTime)
			console.log(ExpireTime)
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
					let EDate=new Date(expiredate);
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
					console.log(message);
					break;


				case "case F":
					if(this.today <= ExpireTime){
						message="survey available";
						surveyResponse="true";
					}else{
						message="survey not available";
						surveyResponse="false";
					}
					console.log(message);
					break;


				case "case G":
					let dateDataG=new Date(startdate);
					let eExpireDate=new Date(expiredate);
					let sTime=starttime;
					break;

				case "case H":
					let dateDataH = new Date(startdate);
					let ExpireDateH = new Date(expiredate);
					let dt=starttime.split(":");
					console.log(ExpireDateH);
					let Htime=new Date(dateDataH.getFullYear(),dateDataH.getMonth(), dateDataH.getDate(),parseInt(dt[0]),parseInt(dt[1]));
					let Stime=new Date(ExpireDateH.getFullYear(),ExpireDateH.getMonth(),ExpireDateH.getDate(),parseInt(dt[0]),parseInt(dt[1]));

					console.log(Htime);
					console.log(Stime);
					if((this.today >= Htime  )){

					}
					


				break;

				case "case I":
				break;

				case "case J":
				break;

				case "case K":
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
				resolve ("case I");
			}
			if(startdate != "" && expiredate == "" && starttime != "" && expiretime != "" ){
				resolve ("case J");
			}
			if(startdate 	== "" && expiredate != "" && starttime == "" && expiretime != "" ){
				resolve ("case K");
			}
			if(startdate == "" && expiredate != "" && starttime != "" && expiretime == "" ){
				resolve ("case L");
			}
			if(startdate == "" && expiredate != "" && starttime == "" && expiretime != "" ){
				resolve ("case M");	
			}

			
		});
	}
	responseLimit(formId){
		return new Promise ((resolve,reject)=>{
			console.log(formId);
			let value;
			let json;
			let query='select * from survey_meta where key="survey_response_limit" AND value=1 AND form_id = '+formId;
			this.servicesProvider.ExecuteRun(query,[]).then((data:any)=>{
				if(data.rows.length > 0){
						this.servicesProvider.MultipleSelectWhere("survey_meta","key","'response_limit'","form_id",formId).then((num:any)=>{
							value=num.rows[0].value;
							this.servicesProvider.MultipleSelectWhere("survey_meta","key","'response_limit_type'","form_id",formId).then((type:any)=>{
								if(type.rows[0].value=="per_user"){
									json=type.rows[0].value;
								}else{
									json=type.rows[0].value;
								}
								console.log(json);
								console.log(value);
							});
						});
				}else{
					console.log("no limit selected");
					resolve("no timer");
				}
			});
		})
	}
	surveytimer(formId){
		return new Promise ((resolve,reject)=>{
			let duration
			console.log(formId);
			let json;
			let query='select * from survey_meta where key="survey_timer" AND value=1 AND form_id = '+formId;
			this.servicesProvider.ExecuteRun(query,[]).then((data:any)=>{
				if(data.rows.length > 0){
					this.servicesProvider.MultipleSelectWhere("survey_meta","key","'survey_duration'","form_id",formId).then((dur:any)=>{
					this.servicesProvider.MultipleSelectWhere("survey_meta","key","'timer_type'","form_id",formId).then((type:any)=>{
						if(type.rows[0].value == "survey_duration"){
							json=type.rows[0].value;
							duration=dur.rows[0].value;
						}else{
							json=type.rows[0].value;
						}
						console.log(json);
						console.log(duration);
					
					});
						
					});
					
				}else{
					console.log("no timer");
					resolve("no timer");
				}
			});
		});
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

