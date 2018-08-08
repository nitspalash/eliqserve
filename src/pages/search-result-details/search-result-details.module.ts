import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchResultDetailsPage } from './search-result-details';

@NgModule({
  declarations: [
    SearchResultDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchResultDetailsPage),
  ],
})
export class SearchResultDetailsPageModule {}
