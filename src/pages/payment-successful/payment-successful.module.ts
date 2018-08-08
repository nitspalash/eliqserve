import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PaymentSuccessfulPage } from './payment-successful';

@NgModule({
  declarations: [
    PaymentSuccessfulPage,
  ],
  imports: [
    IonicPageModule.forChild(PaymentSuccessfulPage),
  ],
})
export class PaymentSuccessfulPageModule {}
