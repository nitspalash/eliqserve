import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
//import {HomePage} from '../pages/home/home'

import {AboutPage} from "../../pages/about/about";
import {AuthProvider} from '../../providers/auth-service/authservice'
import { debounce } from 'ionic-angular/util/util';

/**
 * Generated class for the SearchResultPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search-result',
  templateUrl: 'search-result.html',
})
export class SearchResultPage {
  searchParameter:any;
  dataSet:any;
  searchArray:any;
  imageLink:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public authProvider:AuthProvider,
public alertCtrl:AlertController) {
    console.log(JSON.parse(localStorage.getItem('filterdata')))
    this.searchParameter=JSON.parse(localStorage.getItem('filterdata'));
    console.log(this.searchParameter)

    this.dataSet={
      "brand_name":this.searchParameter.brand_name,
"product_name":this.searchParameter.product_name,
"cat_id":this.searchParameter.cat_id,
"popularity":this.searchParameter.popularity,
"rating":this.searchParameter.rating,
"min_price":this.searchParameter.min_price,
"max_price":this.searchParameter.max_price,
    }

    console.log('set',this.dataSet)

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchResultPage');


    this.authProvider.search(this.dataSet).subscribe(res => {
     
      console.log(res);
      
      let details = res
      
      if(details.Ack == 1){
        console.log("order list")
        this.searchArray=details.products
        console.log(this.searchArray)
        this.imageLink=details.image_link
        console.log (this.imageLink) 
  } 
  else
  {

    let alert = this.alertCtrl.create({
      title: 'No Result',
      message: details.message,
      buttons: ['ok']
    });alert.present();
}
})
  }

   gopage(data)
  {  console.log(data)
    this.navCtrl.push('SearchResultDetailsPage',{param:data})
  }

}
