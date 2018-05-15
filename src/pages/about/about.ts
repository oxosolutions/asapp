import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AioneServicesProvider } from '../../providers/aione-services/aione-services';



@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {
	content:any;
  constructor(public aioneservice:AioneServicesProvider,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.aioneservice.SelectAll("settings").then((result:any)=>{
   		this.content=result.rows.item(0)["about_page_content"];
   		console.log(this.content);
   	})
  }

}
