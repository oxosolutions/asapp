import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SectionalQuestionsPage } from './sectional-questions';

@NgModule({
  declarations: [
    SectionalQuestionsPage,
  ],
  imports: [
    IonicPageModule.forChild(SectionalQuestionsPage),
  ],
})
export class SectionalQuestionsPageModule {}
