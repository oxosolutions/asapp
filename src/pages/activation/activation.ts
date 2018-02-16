import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { SurveyProvider } from '../../providers/survey/survey';
import { AioneServicesProvider } from '../../providers/aione-services/aione-services';
import { AioneHelperProvider } from '../../providers/aione-helper/aione-helper';


@IonicPage()
@Component({
  selector: 'page-activation',
  templateUrl: 'activation.html',
})
export class ActivationPage {

  constructor(public Aioneservices:AioneServicesProvider,public AioneHelp:AioneHelperProvider,private geolocation: Geolocation,public survey:SurveyProvider,public navCtrl: NavController, public navParams: NavParams) {
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ActivationPage');
  }
  activation(){
  	this.AioneHelp.internet().then((conn)=>{
  		this.geolocation.getCurrentPosition().then((resp)=>{
  			console.log(resp.coords.latitude); //console.log(resp.coords.longitude);
  			this.survey.CreateSurvey().then(()=>{

  			});
  		}).catch((error)=>{ console.log(error);
			})
  	});
  }

}
