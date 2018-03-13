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
				 
				this.servicesProvider.ExecuteRun(survey_scheduling,[]).then((scheduling:any)=>{
					if(scheduling.rows.length > 0){
						console.log("yes survey schelduling");
								this.servicesProvider.MultipleSelectWhere("survey_meta","key","'start_date'","form_id",formId).then((startDate:any)=>{
									this.servicesProvider.MultipleSelectWhere("survey_meta","key","'expire_date'","form_id",formId).then((expiredate:any)=>{
										this.servicesProvider.MultipleSelectWhere("survey_meta","key","'survey_start_time'","form_id",formId).then((startTime:any)=>{	
											this.servicesProvider.MultipleSelectWhere("survey_meta","key","'survey_expire_time'","form_id",formId).then((expireTime:any)=>{
											
												if(startDate.rows[0].value != "" && expiredate.rows[0].value == "" && startTime.rows[0].value == "" && expireTime.rows[0].value == "" ){	
													let firstDate = new Date(startDate.rows[0].value);
													console.log(firstDate);
													console.log(this.today);
													if(firstDate > this.today){
														console.log("greater");
													}else{
														console.log("no greater");
													}
													// this.StartDate = (firstDate.getTime() - secondDate.getTime());
													// console.log(this.StartDate);	


												}
												if(startDate.rows[0].value == "" && expiredate.rows[0].value != "" && startTime.rows[0].value == "" && expireTime.rows[0].value == "" ){
													expiredate=expireTime.rows[0].value;		
													console.log(expiredate);			
												}
												
												if(startDate.rows[0].value == "" && expiredate.rows[0].value == "" && startTime.rows[0].value != "" && expireTime.rows[0].value == "" ){
													starttime=startTime.rows[0].value;	
													console.log(starttime);				
												}

												if(startDate.rows[0].value == "" && expiredate.rows[0].value == "" && startTime.rows[0].value == "" && expireTime.rows[0].value != "" ){
													expiretime=expireTime.rows[0].value;	
													console.log(expiretime);		
												}

												if(startDate.rows[0].value != "" && expiredate.rows[0].value != "" && startTime.rows[0].value == "" && expireTime.rows[0].value == "" ){
													date=expiredate.rows[0].value;	
													console.log(date);	

												}


												if(startDate.rows[0].value == "" && expiredate.rows[0].value == "" && startTime.rows[0].value != "" && expireTime.rows[0].value != "" ){
													time=expireTime.rows[0].value;	
													console.log(time);		
												}
												
												

											});
											
										});
									});
								});

					}else{
						noSuceduling="it has no scheduling";
						console.log(noSuceduling);

					}
					// let mydate;
					// let mytime;
					// mydate="26-02-2012";
					// mytime="28-02-2012";
					// mydate=mydate.split("-");
					// var newDate=mydate[1]+"/"+mydate[0]+"/"+mydate[2];
					// mytime=mytime.split("-");
					// var newDate2=mytime[1]+"/"+mytime[0]+"/"+mytime[2];
					// console.log(new Date(newDate).getTime());
					// console.log(new Date(newDate2).getTime());
					// let fixed=new Date(newDate).getTime()-new Date(newDate2).getTime();
					// console.log(fixed);
					//console.log(surveylist);

					

				});
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

