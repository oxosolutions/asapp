import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AioneServicesProvider } from '../../providers/aione-services/aione-services';

@IonicPage()
@Component({
  selector: 'page-sectional-questions',
  templateUrl: 'sectional-questions.html',
})
export class SectionalQuestionsPage {
	id:any;
	questionTitle:any;
	questions : any;
  constructor(public servicesProvider:AioneServicesProvider,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SectionalQuestionsPage');let i=0;
    let Content=[];
    this.questionTitle=localStorage.getItem("ApplicationName");
    // this.questionType=localStorage.getItem("questionType");
    this.id=this.navParams.get('id');

    this.servicesProvider.SelectWhere("questions","group_id",this.id).then((result:any)=>{
      Content.push(result.rows);

      //code for converting json 
      let collection;
      let newcollection; 
      let replacedArray=[]
      Content.forEach((key,value)=>{
        collection=[];
        Object.keys(key).forEach(function(keyvalue,keydata){
          newcollection=[];
          let  newcolumn=[];
          collection=key[keyvalue];
          Object.keys(collection).forEach(function(valuekey,valuedata){
            let newData;
            let replace;
            try{
              replace=collection[valuekey].replace(/'/g,'"');
              newData = JSON.parse(replace);
            }catch(e){
              newData = collection[valuekey];
            }
            newcollection.push(newData);
            newcolumn.push(valuekey); 
          })
          let replacedData={};
          i;
          for(i=0; i< newcollection.length; i++){
            replacedData[newcolumn[i]]=newcollection[i];
          }
          replacedArray.push(replacedData);
        });
      });
      this.questions=replacedArray;
      console.log(this.questions);
      // if(this.questions != undefined){
      //   if(this.questionType == "save_survey"){
      //     this.surveyQuestion=this.questions;
      //     console.log(this.surveyQuestion);    
      //   }else if(this.questionType == "save_section"){

      //   }else if(this.questionType == "questions"){
      //     let i=0;
      //     this.textData(this.questions, i).then(()=>{
      //     });
      //   }    
      // }
    })
  }

}
