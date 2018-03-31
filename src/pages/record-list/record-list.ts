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
  nullSurvey;
  constructor(public servicesProvider:AioneServicesProvider,public navCtrl: NavController, public navParams: NavParams,public popoverCtrl: PopoverController) {
  }

  ionViewDidLoad() {
    this.recordTitle=localStorage.getItem("ApplicationName");
    // this.servicesProvider.SelectAll("surveys").then((survey:any)=>{
    // 		this.listSurvey.push(survey.rows);
    // 		console.log(this.listSurvey);
      
    // })
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
          //value.length;
          for(let i=0; i < value.length; i++){       
            this.servicesProvider.SelectWhere("surveys","id",value.item(i).form_id).then((survey:any)=>{ 
              this.totalQuestion(value.item(i).form_id).then((question:any)=>{
                
                 let rowsData = survey.rows.item(0); 
                 rowsData["questions"]=question
                        
                content.push(rowsData);  

              })
             
            })       
            if(content != undefined){
              SurveySelect.push(content);
              console.log(SurveySelect);
              forloop++;
              if(forloop == survey_meta.rows.item.length ){
                this.listSurvey=SurveySelect;
                console.log(this.listSurvey);
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
  totalQuestion(id){
    return new Promise((resolve,reject)=>{
      this.servicesProvider.SelectWhere("questions","survey_id",id).then((questions:any)=>{
        this.servicesProvider.mobileListArray(questions).then((SurveyData:any)=>{
          resolve(SurveyData.length)
        })  
      })
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
  // public open(itemSlide: ItemSliding, item: Item, $event) {

  //       // reproduce the slide on the click
  //       console.log($event);
  //       this.test = 'true';
  //       $event.target.classList.add('active-sliding');
  //       // itemSlide.setElementClass("active-sliding", true);
  //       // itemSlide.setElementClass("active-slide", true);
  //       // itemSlide.setElementClass("active-options-right", true);
  //       // item.setCssStyle("transform", "translate3d(-144px, 0px, 0px)")

  //   }

}
