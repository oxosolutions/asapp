import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AioneServicesProvider } from '../../providers/aione-services/aione-services';
import {ListsurveyPage} from '../../pages/listsurvey/listsurvey';
import {QuestionPage} from '../../pages/question/question';


@IonicPage()
@Component({
  selector: 'page-groups',
  templateUrl: 'groups.html',
})
export class GroupsPage {
  groupTitle:any;
	ids:any;
	groupsResult:any;
  constructor(public servicesProvider:AioneServicesProvider,public navCtrl: NavController, public navParams: NavParams) {
  }
  questionid(id){
  	this.navCtrl.setRoot(QuestionPage,{'id': id});
  }
  ionViewDidLoad() {
    this.groupTitle=localStorage.getItem("ApplicationName");
    this.ids=this.navParams.get('id');
    this.servicesProvider.SelectWhere("groups","survey_id",this.ids).then((result:any)=>{
    	this.groupsResult=result.rows;
    	console.log(this.groupsResult);
    })
  }

}
