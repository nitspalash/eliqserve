import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditBuyerProfilePage } from './edit-buyer-profile';

@NgModule({
  declarations: [
    EditBuyerProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(EditBuyerProfilePage),
  ],
})
export class EditBuyerProfilePageModule {}
