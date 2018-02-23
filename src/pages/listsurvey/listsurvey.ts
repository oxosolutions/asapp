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
	listSurvey = [];
	data:any;
	questionLength=[];
  constructor(public servicesProvider:AioneServicesProvider,public navCtrl: NavController, public navParams: NavParams) {
  }
  groups(id){
  	console.log(id);
  	this.navCtrl.setRoot(GroupsPage,{'id': id});

  }
ionViewDidLoad(){
	let questionId;
	let questionData:any;
	this.servicesProvider.SelectAll("surveys").then((survey:any)=>{
    		this.listSurvey.push(survey.rows);
    		this.data="SELECT  questions.question_key,surveys.* FROM surveys LEFT JOIN questions ON surveys.id = questions.survey_id";
    		this.servicesProvider.ExecuteRun(this.data,[]).then((SelResult:any)=>{
					this.questionLength.push(SelResult.rows);

    		this.listSurvey.forEach((key,value,)=>{
					this.questionLength.forEach((keys,values,)=>{
						Object.keys(key).forEach(function(svalue,skey){
    					// Object.keys(keys).forEach(function(qvalue,qkey){
		    			// 	console.log(keys[qvalue]);		    				
		    			// });
		    			questionData=key[svalue].id;																																																								 
		    			console.log(questionData);		    				
		    			});
		    			let query='select COUNT(*)  from questions where survey_id = ' + questionData;
		    			this.servicesProvider.ExecuteRun(this.data,[]).then((jj:any)=>{
		    				console.log(jj);
		    			
    			 });  						
    		});
			});
		});

				
    		
    		//console.log(this.questionLength);
  })
}
}
