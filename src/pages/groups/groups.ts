import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AioneServicesProvider } from '../../providers/aione-services/aione-services';
import {ListsurveyPage} from '../../pages/listsurvey/listsurvey';
import {QuestionPage} from '../../pages/question/question';
/**
 * Generated class for the GroupsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-groups',
  templateUrl: 'groups.html',
})
export class GroupsPage {
	ids:any;
	groupsResult:any;
  constructor(public servicesProvider:AioneServicesProvider,public navCtrl: NavController, public navParams: NavParams) {
  }
  questionid(id){
  	console.log(id);
  	this.navCtrl.setRoot(QuestionPage,{'id': id});
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad GroupsPage');
    this.ids=this.navParams.get('id');
    console.log(this.ids);
    this.servicesProvider.SelectWhere("groups","survey_id",this.ids).then((result:any)=>{
    	this.groupsResult=result.rows;
    	console.log(this.groupsResult);
    	console.log(this.groupsResult[0].title);
    })
  }

}
