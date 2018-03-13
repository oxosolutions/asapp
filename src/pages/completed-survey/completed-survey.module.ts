import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CompletedSurveyPage } from './completed-survey';

@NgModule({
  declarations: [
    CompletedSurveyPage,
  ],
  imports: [
    IonicPageModule.forChild(CompletedSurveyPage),
  ],
})
export class CompletedSurveyPageModule {}
