import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AfterSplashPage } from './after-splash';

@NgModule({
  declarations: [
    AfterSplashPage,
  ],
  imports: [
    IonicPageModule.forChild(AfterSplashPage),
  ],
})
export class AfterSplashPageModule {}
