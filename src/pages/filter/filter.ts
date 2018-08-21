import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { FormControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import {AuthProvider} from '../../providers/auth-service/authservice'
import { Events } from 'ionic-angular';

/**
 * Generated class for the FilterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-filter',
  templateUrl: 'filter.html',
})
export class FilterPage {
  public formGroup: FormGroup;
  categoryArray:any;
  searchset:any;
    
  minValue: any = { lower: 500, upper: 5000 };

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private builder: FormBuilder,
  public authProvider:AuthProvider,
  public alertCtrl:AlertController,
  public events:Events,
) {


  // this.min_price = this.formGroup.controls['min_price'];
// this.lookingForRadius = this.userProfileForm.controls['lookingForRadius'];
 
this.formGroup=new FormGroup({
  brand_name:new FormControl ('',Validators.required),
  product_name:new FormControl (''), 
  cat_id:new FormControl (''), 
  popularity:new FormControl (''), 
  rating:new FormControl (''), 
  min_price:new FormControl ([{lower: this.minValue, upper: this.minValue}]), 
  // max_price:new FormControl (''), 
    
});




  }
  

  categorylist()
  {
    this.authProvider.categoryListing().subscribe((res:any) => {
     

      if (res.Ack==1)
      {
       
        this.categoryArray=res.categories;
        console.log(this.categoryArray);
      }
    });
  }

  ionViewDidLoad() {
    this.categorylist();
    this.events.publish('hideFooter', { isHidden: false});
    console.log('ionViewDidLoad FilterPage');
  }

  search(data)
  {
    console.log( this.minValue.lower)
    console.log( this.minValue.upper)
console.log (data)


this.searchset=
{
  "brand_name": data.brand_name,
​"cat_id": data.cat_id,
​"min_price": this.minValue.lower,
"max_price": this.minValue.upper,
​"popularity": data.popularity,
​"product_name": data.product_name,
​"rating":data.rating
}
console.log(this.searchset)
localStorage.setItem('filterdata', JSON.stringify(this.searchset));

if (!this.formGroup.value.brand_name)
{
  let alert = this.alertCtrl.create({
    title: 'Please enter brand name', 
           buttons: ['ok']
  });
  alert.present();
}
else{
  this.navCtrl.push ('SearchResultPage')
}

  }

}
