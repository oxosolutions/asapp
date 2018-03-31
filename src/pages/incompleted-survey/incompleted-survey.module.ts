import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IncompletedSurveyPage } from './incompleted-survey';

@NgModule({
  declarations: [
    IncompletedSurveyPage,
  ],
  imports: [
    IonicPageModule.forChild(IncompletedSurveyPage),
  ],
})
export class IncompletedSurveyPageModule {}
