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
						console.log(value[i].form_id);
						this.surveyScheduling(value[i].form_id).then((surveySch)=>{
								if(surveySch != undefined){
									this.servicesProvider.SelectWhere("surveys","id",value[i].form_id).then((survey:any)=>{
									//console.log(survey.rows[0]);
									content.push(survey.rows[0]);						
								}); 
								}
								
							
						});
						
						if(content != undefined){
							SurveySelect.push(content);
							forloop++;
							if(forloop == survey_meta.rows.length ){
								this.listSurvey=SurveySelect;
								console.log(this.listSurvey);
								//console.log(this.listSurvey[0]);
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

				let timerquery='';
				let survey_scheduling='select * from survey_meta where key="survey_scheduling" AND value=1 AND form_id = '+formId;
				// let survey_timer='select * from survey_meta where key= "survey_timer" AND value=1 AND form_id = '+formId;
				// let survey_limit='select * from survey_meta where key="survey_response_limit" AND value=1 AND form_id = '+formId;
				this.servicesProvider.ExecuteRun(survey_scheduling,[]).then((scheduling:any)=>{
					if(scheduling.rows.length > 0){
						console.log("yes survey schelduling");
								console.log(scheduling.rows);
								this.servicesProvider.MultipleSelectWhere("survey_meta","key","'start_date'","form_id",formId).then((startDate:any)=>{
									this.StartDate=startDate.rows[0].value;

									this.servicesProvider.MultipleSelectWhere("survey_meta","key","'expire_date'","form_id",formId).then((expire:any)=>{
										this.ExpireDate=expire.rows[0].value;

										this.servicesProvider.MultipleSelectWhere("survey_meta","key","'survey_start_time'","form_id",formId).then((startTime:any)=>{
											this.StartTime=startTime.rows[0].value;

											this.servicesProvider.MultipleSelectWhere("survey_meta","key","'survey_expire_time'","form_id",formId).then((expireTime:any)=>{
												this.ExpireTime=expireTime.rows[0].value;

												// console.log(this.StartDate);
												// console.log(this.ExpireDate);
												// console.log(this.StartTime);
												// console.log(this.ExpireTime);
												if(this.StartDate != "" && this.ExpireDate == "" && this.StartTime == "" && this.ExpireTime == "" ){
													console.log(this.StartDate);
												}
												if(this.StartDate == "" && this.ExpireDate != "" && this.StartTime == "" && this.ExpireTime == "" ){
													console.log(this.ExpireDate);
												}
												if(this.StartDate == "" && this.ExpireDate == "" && this.StartTime != "" && this.ExpireTime == "" ){
													console.log(this.StartTime);
												}
												if(this.StartDate != "" && this.ExpireDate == "" && this.StartTime == "" && this.ExpireTime != "" ){
													console.log(this.ExpireTime);
												}
												if(this.StartDate != "" && this.ExpireDate != "" && this.StartTime == "" && this.ExpireTime == "" ){
													console.log("today's date");
													console.log(this.StartDate);
													console.log(this.ExpireDate);
													console.log("today's date");
													//resolve("df");
												}
												if(this.StartDate == "" && this.ExpireDate == "" && this.StartTime != "" && this.ExpireTime != "" ){
													console.log("got time");
													console.log(this.StartTime);
													console.log(this.ExpireTime);
													//resolve("got time");
												}
												if(this.StartDate == "" && this.ExpireDate == "" && this.StartTime == "" && this.ExpireTime == "" ){
													console.log("no time");
												}
												this.surveytimer(formId).then((surveyTim)=>{
													resolve(surveyTim);
												});

												//resolve("data");
											});
											
										});
									});
								});

					}else{
						this.surveytimer(formId).then((surveyTim)=>{
						console.log("global available");
							resolve(surveyTim);
						});	
						//resolve("global avaliable");
					}

					
				});
		});
	}
	surveytimer(formId){
		return new Promise ((resolve,reject)=>{
			let duration
			console.log(formId);
			let query='select * from survey_meta where key="survey_timer" AND value=1 AND form_id = '+formId;
			this.servicesProvider.ExecuteRun(query,[]).then((data:any)=>{
				console.log(data.rows);
				if(data.rows.length > 0){
					this.servicesProvider.MultipleSelectWhere("survey_meta","key","'survey_duration'","form_id",formId).then((dur:any)=>{
						duration=dur.rows[0].value;
						if(duration != ""){
						console.log(duration);
						resolve(duration);
						}else{
							console.log("no timer");
							resolve(" no timer");
						}
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

