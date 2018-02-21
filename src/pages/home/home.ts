import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { AioneHelperProvider } from '../../providers/aione-helper/aione-helper';
import { AioneServicesProvider } from '../../providers/aione-services/aione-services';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage  {
  constructor(public servicesProvider:AioneServicesProvider,public navCtrl: NavController) {    
  }
}
