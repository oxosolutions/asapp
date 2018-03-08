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
		metaSurvey.push(survey_meta.rows);
		if(metaSurvey.length > 0){
			metaSurvey.forEach((value,key)=>{
				console.log(value);
				let content=[];
				for(let i=0; i < value.length; i++){
					this.servicesProvider.SelectWhere("surveys","id",value[i].form_id).then((survey:any)=>{
						//console.log(survey.rows[0]);
						content.push(survey.rows[0]);						
					}); 
					if(content != undefined){
						SurveySelect.push(content);
						

					}
				}

			});
		this.listSurvey=SurveySelect[0];
		console.log(this.listSurvey);

		}else{
			console.log("no survey");
		}
		// if(survey_meta.rows.length > 0){
		// 	let loopLength=0;
		// 	metaSurvey.forEach((value,key)=>{
		// 	 	console.log(value);
		// 	 	let Surveydata;	
		// 	 	Object.keys(value).forEach((metavalue,metaKey)=>{
		// 	 			this.servicesProvider.SelectWhere("surveys","id",value[metavalue].form_id).then((survey:any)=>{
		// 					console.log(survey.rows);
		// 					Surveydata=survey.rows;
		// 				}); 
		// 				if(Surveydata != undefined){

		// 				console.log(Surveydata);
		// 				}
		// 				//this.listSurvey.push(Surveydata);
		// 				//console.log(this.listSurvey);
		// 				//loopLength++;
		// 				// console.log(loopLength);

		// 				// if(loopLength==value.length){
		// 				// 	console.log("yess length");
		// 				// console.log(this.listSurvey);
		// 				// }
		// 	 	});
			 	

		// 	 });

		// 	// for(let i=0; i < survey_meta.rows.length;){
		// 	// 	console.log(survey_meta.rows.length);
		// 	// 	console.log(survey_meta.rows[i].form_id);
		// 	// 	this.servicesProvider.SelectWhere("surveys","id",survey_meta.rows[i].form_id).then((survey:any)=>{
		// 	// 		console.log(survey.rows);
		// 	// 		metaSurvey.push(survey.rows);
		// 	// 		i++;
		// 	// 	}); 
		// 	//}
		// 	// console.log(metaSurvey);
		// 	// if(survey_meta.rows.length == metaSurvey.length){
		// 	// 		this.listSurvey=metaSurvey;
		// 	//   console.log(this.listSurvey)
		// 	// }
			
		// }
		//  //else{
		// // 	// console.log("no survey");
		// // }
		
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
