import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderListPage } from './order-list';
// import { Ionic2RatingModule } from 'ionic2-rating';
@NgModule({
  declarations: [
    OrderListPage,
  ],
  imports: [
    IonicPageModule.forChild(OrderListPage),
    // Ionic2RatingModule 
  ],
})
export class OrderListPageModule {}
