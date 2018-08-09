import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FormControl,FormGroup,FormBuilder,Validators} from '@angular/forms'
/**
 * Generated class for the CheckoutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-checkout',
  templateUrl: 'checkout.html',
})
export class CheckoutPage {
  showItem: boolean=true;
  showForm:boolean=true;
shippingForm:FormGroup
billingForm:FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams,
  builder:FormBuilder,
) {

this.shippingForm=new FormGroup({
  ship_fname:new FormControl ('',Validators.required),
  ship_lname:new FormControl ('',Validators.required),
  ship_mob:new FormControl ('',Validators.required),
  ship_pin:new FormControl ('',Validators.required),
  shipadd_one:new FormControl ('',Validators.required),
  shipadd_two:new FormControl ('',Validators.required),
  ship_city:new FormControl ('',Validators.required),
  ship_state:new FormControl ('',Validators.required),
  ship_country:new FormControl ('',Validators.required),
});


this.billingForm=new FormGroup({
  bill_fname:new FormControl ('',Validators.required),
  bill_lname:new FormControl ('',Validators.required),
  bill_mob:new FormControl ('',Validators.required),
  bill_pin:new FormControl ('',Validators.required),
  billadd_one:new FormControl ('',Validators.required),
  billadd_two:new FormControl ('',Validators.required),
  bill_city:new FormControl ('',Validators.required),
  bill_state:new FormControl ('',Validators.required),
  bill_country:new FormControl ('',Validators.required),
});
 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckoutPage');
  }

  finalCheckout()
  {
    this.navCtrl.push ('FinalCheckoutPage')
  }

  toggleCheckbox() {
  // this.ischecked=true;
    
    this.showItem = !this.showItem;
  }

  toggleAnotherCheckbox()
  {
    // this.ischecked=false
this.showForm=!this.showForm
  }

  submit(billdata,shipdata)
  {
    console.log(billdata)
    console.log(shipdata)

this.navCtrl.push ('FinalCheckoutPage',{param1:JSON.stringify(billdata),param2:JSON.stringify(shipdata)})

  }



}
