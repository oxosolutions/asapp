import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ItemSliding } from 'ionic-angular';
import { AioneServicesProvider } from '../../providers/aione-services/aione-services';
import {GroupsPage} from '../../pages/groups/groups';
import { PopoverController } from 'ionic-angular';
import { CompletedSurveyPage } from '../../pages/completed-survey/completed-survey';
import { IncompletedSurveyPage } from '../../pages/incompleted-survey/incompleted-survey';


@IonicPage()
@Component({
  selector: 'page-record-list',
  templateUrl: 'record-list.html',
})
export class RecordListPage {
  recordTitle:any;
	listSurvey = [];
  test = 'false';
  constructor(public servicesProvider:AioneServicesProvider,public navCtrl: NavController, public navParams: NavParams,public popoverCtrl: PopoverController) {
  }

  ionViewDidLoad() {
    this.recordTitle=localStorage.getItem("ApplicationName");
    this.servicesProvider.SelectAll("surveys").then((survey:any)=>{
    		this.listSurvey.push(survey.rows);
    		console.log(this.listSurvey);
    })
  }
  presentPopover() {
    let popover = this.popoverCtrl.create(GroupsPage);
    popover.present();
  }
  completedSurveyPage(){
     this.navCtrl.push(CompletedSurveyPage);
  }
  incompletedSurveyPage(){
    this.navCtrl.push(IncompletedSurveyPage);
  }
  public open(itemSlide: ItemSliding, item: Item, $event) {

        // reproduce the slide on the click
        console.log($event);
        this.test = 'true';
        $event.target.classList.add('active-sliding');
        // itemSlide.setElementClass("active-sliding", true);
        // itemSlide.setElementClass("active-slide", true);
        // itemSlide.setElementClass("active-options-right", true);
        // item.setCssStyle("transform", "translate3d(-144px, 0px, 0px)")

    }

}
