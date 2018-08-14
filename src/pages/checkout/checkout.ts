import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import {FormControl,FormGroup,FormBuilder,Validators} from '@angular/forms';
import {AuthProvider} from '../../providers/auth-service/authservice'
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
  radio:boolean=false;
  deliveryRadio:boolean=false;

shippingForm:FormGroup
billingForm:FormGroup;
loginuser:any;
userId:any;
userIdSet:any;
addressListArray:any;
addressArray:any;


  constructor(public navCtrl: NavController, public navParams: NavParams,
  builder:FormBuilder,
  public alertCtrl:AlertController,
  public authProvider:AuthProvider,
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
  // existAdd:new FormControl('')
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
 


if(JSON.parse(localStorage.getItem('userDetails')))
    {
      this.loginuser = JSON.parse(localStorage.getItem('userDetails')); 
      this.userId=this.loginuser.id
    }
    this.userIdSet={
      "user_id":this.userId
    }

this.authProvider.addressList(this.userIdSet).subscribe(res=>{
  console.log(res);
 
  let details = res
  if(details.Ack == 1){
    console.log('addresslist')
    this.addressListArray=details.addresslist
  
    // this.shippingForm.controls['existAdd'].setValue(this.addressListArray[0].shiping.id);
    // console.log (this.addressListArray[0].shiping.length);
  

  for (var i=0;i<this.addressListArray.length;i++)
  {
    if (this.addressListArray[i].shiping!=null)
    {
      console.log('address found')
      this.addressArray=this.addressListArray[i].shiping;
      console.log(this.addressArray)
    }
    else{
      console.log('address not found')
      this.addressArray='';
    }
  }

  }
});



  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckoutPage');
    
  }

  finalCheckout()
  {
    this.navCtrl.push ('FinalCheckoutPage')
  }

  toggleShippingCheckbox() {
  // this.ischecked=true;
  this.radio=true;
    this.showItem = !this.showItem;


    this.shippingForm.controls ['ship_fname'].setValue ('');
    this.shippingForm.controls ['ship_lname'].setValue('');
    this.shippingForm.controls['ship_mob'].setValue('');
    this.shippingForm.controls['shipadd_one'].setValue('');
    this.shippingForm.controls['shipadd_two'].setValue('');
    this.shippingForm.controls['ship_city'].setValue('');
    this.shippingForm.controls['ship_pin'].setValue('');
    this.shippingForm.controls['ship_state'].setValue('');
    this.shippingForm.controls['ship_country'].setValue('');

    
  }

 

  shippingCheckbox(firstname,lastname,mobile,address1,address2,city,pin,state,country)
  {
    this.radio=false;

console.log(firstname)
console.log(lastname)
console.log(mobile)
console.log(address1)
console.log(address2)
console.log(city)
console.log(pin)
console.log(state)
console.log(country)



this.shippingForm.controls ['ship_fname'].setValue (firstname);
this.shippingForm.controls ['ship_lname'].setValue(lastname);
this.shippingForm.controls['ship_mob'].setValue(mobile);
this.shippingForm.controls['shipadd_one'].setValue(address1);
this.shippingForm.controls['shipadd_two'].setValue(address2);
this.shippingForm.controls['ship_city'].setValue(city);
this.shippingForm.controls['ship_pin'].setValue(pin);
this.shippingForm.controls['ship_state'].setValue(state);
this.shippingForm.controls['ship_country'].setValue(country);
  }


  deliveryCheckbox(firstname,lastname,mobile,address1,address2,city,pin,state,country)
  {
this.deliveryRadio=false;


console.log(firstname)
console.log(lastname)
console.log(mobile)
console.log(address1)
console.log(address2)
console.log(city)
console.log(pin)
console.log(state)
console.log(country)

// this.billingForm.value.bill_fname=firstname;
// this.billingForm.value.bill_lname=firstname;
// this.billingForm.value.bill_mob=firstname;
// this.billingForm.value.billadd_one=firstname;
// this.billingForm.value.billadd_two=firstname;
// this.billingForm.value.bill_city=firstname;
// this.billingForm.value.bill_pin=firstname;
// this.billingForm.value.bill_state=firstname;
// this.billingForm.value.bill_country=firstname;

this.billingForm.controls ['bill_fname'].setValue (firstname);
this.billingForm.controls ['bill_lname'].setValue(lastname);
this.billingForm.controls['bill_mob'].setValue(mobile);
this.billingForm.controls['billadd_one'].setValue(address1);
this.billingForm.controls['billadd_two'].setValue(address2);
this.billingForm.controls['bill_city'].setValue(city);
this.billingForm.controls['bill_pin'].setValue(pin);
this.billingForm.controls['bill_state'].setValue(state);
this.billingForm.controls['bill_country'].setValue(country);

  }

  toggleDeliveryCheckbox()
  {
    this.deliveryRadio=true;
this.showForm=!this.showForm

this.billingForm.controls ['bill_fname'].setValue ('');
this.billingForm.controls ['bill_lname'].setValue('');
this.billingForm.controls['bill_mob'].setValue('');
this.billingForm.controls['billadd_one'].setValue('');
this.billingForm.controls['billadd_two'].setValue('');
this.billingForm.controls['bill_city'].setValue('');
this.billingForm.controls['bill_pin'].setValue('');
this.billingForm.controls['bill_state'].setValue('');
this.billingForm.controls['bill_country'].setValue('');
  }

  submit(billdata,shipdata)
  {
    console.log(billdata)
    console.log(shipdata)
    

if (!this.shippingForm.value.ship_fname)
{
  const alert = this.alertCtrl.create({
    title: 'Please enter your first name',
       buttons: ['ok']
  });
  alert.present();
}
else if (!this.shippingForm.value.ship_lname)
{
  const alert = this.alertCtrl.create({
    title: 'Please enter your last name',
       buttons: ['ok']
  });
  alert.present();
}
else if (!this.shippingForm.value.ship_mob)
{
  const alert = this.alertCtrl.create({
    title: 'Please enter your mobile number',
       buttons: ['ok']
  });
  alert.present();
}
else if (!this.shippingForm.value.shipadd_one)
{
  const alert = this.alertCtrl.create({
    title: 'Please enter your address',
       buttons: ['ok']
  });
  alert.present();
}
else if (!this.shippingForm.value.shipadd_two)
{
  const alert = this.alertCtrl.create({
    title: 'Please enter your detail address',
       buttons: ['ok']
  });
  alert.present();
}
else if (!this.shippingForm.value.ship_city)
{
  const alert = this.alertCtrl.create({
    title: 'Please enter your city',
       buttons: ['ok']
  });
  alert.present();
}
else if (!this.shippingForm.value.ship_state)
{
  const alert = this.alertCtrl.create({
    title: 'Please enter your state',
       buttons: ['ok']
  });
  alert.present();
}
else if (!this.shippingForm.value.ship_pin)
{
  const alert = this.alertCtrl.create({
    title: 'Please enter your postcode',
       buttons: ['ok']
  });
  alert.present();
}
else if (!this.shippingForm.value.ship_country)
{
  const alert = this.alertCtrl.create({
    title: 'Please enter your country',
       buttons: ['ok']
  });
  alert.present();
}


else if (!this.billingForm.value.bill_fname)
{
  const alert = this.alertCtrl.create({
    title: 'Please enter your first name',
       buttons: ['ok']
  });
  alert.present();
}
else if (!this.billingForm.value.bill_lname)
{
  const alert = this.alertCtrl.create({
    title: 'Please enter your last name',
       buttons: ['ok']
  });
  alert.present();
}
else if (!this.billingForm.value.bill_mob)
{
  const alert = this.alertCtrl.create({
    title: 'Please enter your mobile number',
       buttons: ['ok']
  });
  alert.present();
}
else if (!this.billingForm.value.billadd_one)
{
  const alert = this.alertCtrl.create({
    title: 'Please enter your address',
       buttons: ['ok']
  });
  alert.present();
}
else if (!this.billingForm.value.billadd_two)
{
  const alert = this.alertCtrl.create({
    title: 'Please enter your detail address',
       buttons: ['ok']
  });
  alert.present();
}
else if (!this.billingForm.value.bill_city)
{
  const alert = this.alertCtrl.create({
    title: 'Please enter your city',
       buttons: ['ok']
  });
  alert.present();
}
else if (!this.billingForm.value.bill_state)
{
  const alert = this.alertCtrl.create({
    title: 'Please enter your state',
       buttons: ['ok']
  });
  alert.present();
}
else if (!this.billingForm.value.bill_pin)
{
  const alert = this.alertCtrl.create({
    title: 'Please enter your postcode',
       buttons: ['ok']
  });
  alert.present();
}
else if (!this.billingForm.value.bill_country)
{
  const alert = this.alertCtrl.create({
    title: 'Please enter your country',
       buttons: ['ok']
  });
  alert.present();
}


else{
  console.log('next')
this.navCtrl.push ('FinalCheckoutPage',{param1:JSON.stringify(billdata),param2:JSON.stringify(shipdata)})

}

  }



}
