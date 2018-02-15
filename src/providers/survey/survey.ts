import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AioneServicesProvider } from '../../providers/aione-services/aione-services';
import { AioneHelperProvider } from '../../providers/aione-helper/aione-helper';
/*
  Generated class for the SurveyProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SurveyProvider {

  constructor(public http: HttpClient) {
    console.log('Hello SurveyProvider Provider');
  }

}
