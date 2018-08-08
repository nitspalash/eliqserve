import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FinalCheckoutPage } from './final-checkout';

@NgModule({
  declarations: [
    FinalCheckoutPage,
  ],
  imports: [
    IonicPageModule.forChild(FinalCheckoutPage),
  ],
})
export class FinalCheckoutPageModule {}
