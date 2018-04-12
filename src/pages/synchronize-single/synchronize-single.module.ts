import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SynchronizeSinglePage } from './synchronize-single';

@NgModule({
  declarations: [
    SynchronizeSinglePage,
  ],
  imports: [
    IonicPageModule.forChild(SynchronizeSinglePage),
  ],
})
export class SynchronizeSinglePageModule {}
