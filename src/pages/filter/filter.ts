import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { FormControl, AbstractControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
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
    
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private builder: FormBuilder,
  public authProvider:AuthProvider,
  public alertCtrl:AlertController,
  public events:Events,
) {

 
this.formGroup=new FormGroup({
  brand_name:new FormControl ('',Validators.required),
  product_name:new FormControl (''), 
  cat_id:new FormControl (''), 
  popularity:new FormControl (''), 
  rating:new FormControl (''), 
  min_price:new FormControl (''), 
  max_price:new FormControl (''), 
    
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
    this.events.publish('hideFooter', { isHidden: true});
    console.log('ionViewDidLoad FilterPage');
  }

  search(data)
  {
console.log (data)
localStorage.setItem('filterdata', JSON.stringify(data));

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