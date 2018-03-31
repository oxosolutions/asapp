import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CompleteSurveyPage } from './complete-survey';

@NgModule({
  declarations: [
    CompleteSurveyPage,
  ],
  imports: [
    IonicPageModule.forChild(CompleteSurveyPage),
  ],
})
export class CompleteSurveyPageModule {}
