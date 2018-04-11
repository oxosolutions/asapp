import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SynchronizeRecordPage } from './synchronize-record';

@NgModule({
  declarations: [
    SynchronizeRecordPage,
  ],
  imports: [
    IonicPageModule.forChild(SynchronizeRecordPage),
  ],
})
export class SynchronizeRecordPageModule {}
