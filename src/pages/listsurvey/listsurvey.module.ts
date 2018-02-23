import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListsurveyPage } from './listsurvey';

@NgModule({
  declarations: [
    ListsurveyPage,
  ],
  imports: [
    IonicPageModule.forChild(ListsurveyPage),
  ],
})
export class ListsurveyPageModule {}
