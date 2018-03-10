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
  constructor(public servicesProvider:AioneServicesProvider,public navCtrl: NavController, public navParams: NavParams) {
  }
  groups(id){
  	this.navCtrl.setRoot(GroupsPage,{'id': id});
  }
	ionViewDidLoad(){  
		let questionId;
		let questionData:any;
		let metaSurvey=[];
		let SurveySelect=[];
		this.surveyTitle=localStorage.getItem("ApplicationName");
		let query='Select * from survey_meta where key = "enable_survey" AND value = 1';
		

		this.servicesProvider.ExecuteRun(query,[]).then((survey_meta:any)=>{
			console.log(survey_meta.rows);
			metaSurvey.push(survey_meta.rows);
			if(survey_meta.rows.length > 0){
				let forloop=0;
				metaSurvey.forEach((value,key)=>{
					//console.log(value);
					
					let content=[];
					for(let i=0; i < value.length; i++){
						let timerquery='';
						let survey_scheduling='select * from survey_meta where key="survey_scheduling" AND value=1 AND form_id = '+value[i].form_id;
						let survey_timer='select * from survey_meta where key= "survey_timer" AND value=1 AND form_id = '+value[i].form_id;
						let survey_limit='select * from survey_meta where key="survey_response_limit" AND value=1 AND form_id = '+value[i].form_id;

						this.servicesProvider.ExecuteRun(survey_scheduling,[]).then((scheduling:any)=>{
						console.log(value[i].form_id);
						console.log(value[i].key)
							if(scheduling.rows.length > 0){
								console.log('yes scheduling exist');
								console.log(scheduling.rows[0]);
								//c
							}else{
								console.log("global available");
							}
						});


						this.servicesProvider.SelectWhere("surveys","id",value[i].form_id).then((survey:any)=>{
							//console.log(survey.rows[0]);
							content.push(survey.rows[0]);						
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
}
