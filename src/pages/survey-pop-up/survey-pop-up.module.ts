import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SurveyPopUpPage } from './survey-pop-up';

@NgModule({
  declarations: [
    SurveyPopUpPage,
  ],
  imports: [
    IonicPageModule.forChild(SurveyPopUpPage),
  ],
})
export class SurveyPopUpPageModule {}
