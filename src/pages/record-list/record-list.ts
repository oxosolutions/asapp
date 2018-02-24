import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AioneServicesProvider } from '../../providers/aione-services/aione-services';
import {GroupsPage} from '../../pages/groups/groups';

@IonicPage()
@Component({
  selector: 'page-record-list',
  templateUrl: 'record-list.html',
})
export class RecordListPage {
  recordTitle:any;
	listSurvey = [];
  constructor(public servicesProvider:AioneServicesProvider,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.recordTitle=localStorage.getItem("ApplicationName");
    this.servicesProvider.SelectAll("surveys").then((survey:any)=>{
    		this.listSurvey.push(survey.rows);
    		console.log(this.listSurvey);
    })
  }

}
