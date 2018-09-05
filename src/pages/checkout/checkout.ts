import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,LoadingController } from 'ionic-angular';
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
  radio:boolean=true;
  deliveryRadio:boolean=false;
  shipAddress:boolean=true;

shippingForm:FormGroup
billingForm:FormGroup;
loginuser:any;
userId:any;
userIdSet:any;
shippingAddArray:any;
billingAddArray:any;
addressArray:any;
user_Exist:any;
username:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  builder:FormBuilder,
  public alertCtrl:AlertController,
  public authProvider:AuthProvider,
  public loadingCtrl:LoadingController,
) {
  
  this.radio=true;
this.shippingForm=new FormGroup({
  ship_id:new FormControl (''),
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


/* this.billingForm=new FormGroup({
  billing_id: new FormControl (''),
  bill_fname:new FormControl ('',Validators.required),
  bill_lname:new FormControl ('',Validators.required),
  bill_mob:new FormControl ('',Validators.required),
  bill_pin:new FormControl ('',Validators.required),
  billadd_one:new FormControl ('',Validators.required),
  billadd_two:new FormControl ('',Validators.required),
  bill_city:new FormControl ('',Validators.required),
  bill_state:new FormControl ('',Validators.required),
  bill_country:new FormControl ('',Validators.required),
});*/
 


if(JSON.parse(localStorage.getItem('userDetails')))
    {
      this.loginuser = JSON.parse(localStorage.getItem('userDetails')); 
      this.userId=this.loginuser.id
      this.user_Exist=1
      
      // this.username=this.loginuser.first_name
      console.log(this.loginuser.city)
      console.log(this.loginuser)


      this.shippingForm.controls ['ship_id'].setValue ('');
      this.shippingForm.controls ['ship_fname'].setValue (this.loginuser.first_name);
      this.shippingForm.controls ['ship_lname'].setValue('');
      this.shippingForm.controls['ship_mob'].setValue(this.loginuser.phone);
      this.shippingForm.controls['shipadd_one'].setValue('');
      this.shippingForm.controls['shipadd_two'].setValue('');
      this.shippingForm.controls['ship_city'].setValue(this.loginuser.city);
      this.shippingForm.controls['ship_pin'].setValue('');
      this.shippingForm.controls['ship_state'].setValue('');
      this.shippingForm.controls['ship_country'].setValue(this.loginuser.country);
    } 
    else{
      this.user_Exist=0
    }
    this.userIdSet={
      "user_id":this.userId
    }

    let loading = this.loadingCtrl.create({
      content: 'Please wait...',
      // duration: 6000
    });

this.authProvider.addressList(this.userIdSet).subscribe(res=>{
  console.log(res);
 
  let details = res
  if(details.Ack == 1){
    loading.dismiss();
    
    console.log('addresslist')
    this.shippingAddArray=details.shipping
    console.log('shi', this.shippingAddArray)
    this.billingAddArray=details.billing
    console.log('bill', this.billingAddArray)
    console.log(this.shippingAddArray[0].shiping)
    if (this.shippingAddArray[0].shiping!=null)
    {

      console.log('ack')
      this.shipAddress=true;
      this.radio=false;
/*new add*/
      this.shippingForm.controls ['ship_id'].setValue (this.shippingAddArray[0].shiping.id);
this.shippingForm.controls ['ship_fname'].setValue (this.shippingAddArray[0].shiping.first_name);
this.shippingForm.controls ['ship_lname'].setValue(this.shippingAddArray[0].shiping.last_name);
this.shippingForm.controls['ship_mob'].setValue(this.shippingAddArray[0].shiping.mobile);
this.shippingForm.controls['shipadd_one'].setValue(this.shippingAddArray[0].shiping.address1);
this.shippingForm.controls['shipadd_two'].setValue(this.shippingAddArray[0].shiping.address2);
this.shippingForm.controls['ship_city'].setValue(this.shippingAddArray[0].shiping.city);
this.shippingForm.controls['ship_pin'].setValue(this.shippingAddArray[0].shiping.pin);
this.shippingForm.controls['ship_state'].setValue(this.shippingAddArray[0].shiping.state);
this.shippingForm.controls['ship_country'].setValue(this.shippingAddArray[0].shiping.country);
/*new add*/
      // this.shippingForm.controls ['ship_id'].setValue(true)
    }
    else
    {
      this.shipAddress=false;
      this.radio=true;
    }
    // this.shippingForm.controls['existAdd'].setValue(this.addressListArray[0].shiping.id);
    // console.log (this.addressListArray[0].shiping.length);

  } else
  {
    loading.dismiss();
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
  console.log('toggle shipping checkbox')
  
  this.shipAddress=!this.shipAddress
  this.radio=true;
    this.showItem = !this.showItem;

    
    this.shippingForm.controls ['ship_id'].setValue ('');
    this.shippingForm.controls ['ship_fname'].setValue (this.loginuser.first_name);
    this.shippingForm.controls ['ship_lname'].setValue('');
    this.shippingForm.controls['ship_mob'].setValue(this.loginuser.phone);
    this.shippingForm.controls['shipadd_one'].setValue('');
    this.shippingForm.controls['shipadd_two'].setValue('');
    this.shippingForm.controls['ship_city'].setValue(this.loginuser.city);
    this.shippingForm.controls['ship_pin'].setValue('');
    this.shippingForm.controls['ship_state'].setValue('');
    this.shippingForm.controls['ship_country'].setValue(this.loginuser.country);

    
  }

 

  shippingCheckbox(id,firstname,lastname,mobile,address1,address2,city,pin,state,country)
  {

    console.log('shipping checkbox')
    this.radio=false;
console.log(id);
console.log(firstname)
console.log(lastname)
console.log(mobile)
console.log(address1)
console.log(address2)
console.log(city)
console.log(pin)
console.log(state)
console.log(country)


this.shippingForm.controls ['ship_id'].setValue (id);
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


  /*deliveryCheckbox(id,firstname,lastname,mobile,address1,address2,city,pin,state,country)
  {
this.deliveryRadio=false;

console.log(id)
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



this.billingForm.controls['billing_id'].setValue(id);
this.billingForm.controls['bill_fname'].setValue(firstname);
this.billingForm.controls['bill_lname'].setValue(lastname);
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

this.billingForm.controls ['billing_id'].setValue('');
this.billingForm.controls ['bill_fname'].setValue('');
this.billingForm.controls ['bill_lname'].setValue('');
this.billingForm.controls['bill_mob'].setValue('');
this.billingForm.controls['billadd_one'].setValue('');
this.billingForm.controls['billadd_two'].setValue('');
this.billingForm.controls['bill_city'].setValue('');
this.billingForm.controls['bill_pin'].setValue('');
this.billingForm.controls['bill_state'].setValue('');
this.billingForm.controls['bill_country'].setValue('');
  }*/

  // submit(bilata,shipdata)

  submit(shipdata)
  {
  
    console.log(shipdata)
    

if (!this.shippingForm.value.ship_fname)
{
  const alert = this.alertCtrl.create({
    title: 'Please enter your name',
       buttons: ['ok']
  });
  alert.present();
}
// else if (!this.shippingForm.value.ship_lname)
// {
//   const alert = this.alertCtrl.create({
//     title: 'Please enter your last name',
//        buttons: ['ok']
//   });
//   alert.present();
// }
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
// else if (!this.shippingForm.value.shipadd_two)
// {
//   const alert = this.alertCtrl.create({
//     title: 'Please enter your detail address',
//        buttons: ['ok']
//   });
//   alert.present();
// }
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


/*else if (!this.billingForm.value.bill_fname)
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
// else if (!this.billingForm.value.billadd_two)
// {
//   const alert = this.alertCtrl.create({
//     title: 'Please enter your detail address',
//        buttons: ['ok']
//   });
//   alert.present();
// }
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
}*/


else{
  console.log('next')
this.navCtrl.push ('FinalCheckoutPage',{param2:JSON.stringify(shipdata)})

}

  }



}
