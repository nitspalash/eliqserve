import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import {FormControl,FormGroup,FormBuilder,Validators} from '@angular/forms';
import {AuthProvider} from '../../providers/auth-service/authservice'

/**
 * Generated class for the FinalCheckoutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-final-checkout',
  templateUrl: 'final-checkout.html',
})
export class FinalCheckoutPage {
shipParam:any;
billParam:any;
shipdata:any;
billdata:any;
loginuser:any;
userId:any;
userIdSet:any;
cartArray:any;
totalPrice:any;
totalItem:any;
cartvalue:any=[];
sellerArray:any;
sellerFName:any;
sellerLName:any;
sellerEmail:any;
sellerPhone:any;
shippingCharges:any;
// payForm:FormGroup
  constructor(public navCtrl: NavController, public navParams: NavParams,
  public builder:FormBuilder,
  public authProvider:AuthProvider,
  public alertCtrl:AlertController
) {

    this.billParam=navParams.get ('param1');
    this.shipParam=navParams.get ('param2');
    console.log (this.billParam)
    console.log (this.shipParam)
   


    // this.payForm=new FormGroup({
    //   paymethod:new FormControl ('',Validators.required)
    // })


    if(JSON.parse(localStorage.getItem('userDetails')))
    {
      this.loginuser = JSON.parse(localStorage.getItem('userDetails')); 
      this.userId=this.loginuser.id
      console.log (localStorage.getItem('userDetails'))
      console.log ( this.userId)
    }


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FinalCheckoutPage');


    
    this.userIdSet=
    {
      "user_id":this.userId
    }

    this.authProvider.cartList(this.userIdSet).subscribe(res=>{
      console.log(res);
     
      let details = res
      if(details.Ack == 1){
        
        this.cartArray=details.cart
        this.totalPrice=details.total_price;
        this.totalItem=details.total_item;
        console.log( this.cartArray);  
        console.log( this.totalPrice);
        console.log( this.totalItem);
        this.shippingCharges=this.cartArray[0].shipping_charge;
        console.log('ship',this.shippingCharges)
        this.sellerFName=this.cartArray[0].user.first_name;
        this.sellerLName=this.cartArray[0].user.last_name;
        this.sellerEmail=this.cartArray[0].user.email;
        this.sellerPhone=this.cartArray[0].user.phone;
        console.log(this.sellerFName);
        
        
      }
        
  });
  }

  payment()
  {
    
   
 this.navCtrl.push ('PaymentPage',{param1:this.billParam,param2:this.shipParam})

// this.shipdata=JSON.parse(this.shipParam);
// this.billdata=JSON.parse(this.billParam);
// console.log (this.shipdata)
// this.cartvalue=
// {"ship_id":this.shipdata.ship_id,
//   "ship_fname":this.shipdata.ship_fname,
// "ship_lname":this.shipdata.ship_lname,
// "ship_mob":this.shipdata.ship_mob,
// "ship_pin":this.shipdata.ship_pin,
// "shipadd_one":this.shipdata.shipadd_one,
// "shipadd_two":this.shipdata.shipadd_two,
// "ship_city":this.shipdata.ship_city,
// "ship_state":this.shipdata.ship_state,
// "ship_country":this.shipdata.ship_country,

// "billing_id":this.billdata.billing_id,
// "bill_fname":this.billdata.bill_fname,
// "bill_lname":this.billdata.bill_lname,
// "bill_mob":this.billdata.bill_mob,
// "bill_pin":this.billdata.bill_pin,
// "billadd_one":this.billdata.billadd_one,
// "billadd_two":this.billdata.billadd_two,
// "bill_city":this.billdata.bill_city,
// "bill_state":this.billdata.bill_state,
// "bill_country":this.billdata.bill_country,
// "user_id":this.userId,
// // "paymethod":data.paymethod
// }
// var body ="ship_fname=" + this.shipdata.ship_fname + "ship_lname="+ this.shipdata.ship_lname +
// + "ship_mob="+this.shipdata.ship_mob+
// "ship_pin="+this.shipdata.ship_pin+
// "shipadd_one="+this.shipdata.shipadd_one+
// "shipadd_two="+this.shipdata.shipadd_two+
// "ship_city="+this.shipdata.ship_city+
// "ship_state="+this.shipdata.ship_state+
// "ship_country="+this.shipdata.ship_country+
// "bill_fname="+this.billdata.bill_fname+
// "bill_lname="+this.billdata.bill_lname+
// "bill_mob="+this.billdata.bill_mob+
// "bill_pin="+this.billdata.bill_pin+
// "billadd_one="+this.billdata.billadd_one+
// "billadd_two="+this.billdata.billadd_two+
// "bill_city="+this.billdata.bill_city+
// "bill_state="+this.billdata.bill_state+
// "bill_country="+this.billdata.bill_country+
// "user_id="+this.userId+
// // "paymethod="+data.paymethod
//     console.log ("boidy",body)


//     this.authProvider.checkout(this.cartvalue).subscribe(res=>{
//       console.log('Hello')
      
//       console.log(res);
     
//       let details = res
//       if(details.ack == 1){
//         console.log ('checkout')

        

//         const alert = this.alertCtrl.create({
//           title: details.message,
//              buttons: ['ok']
//         });
//         alert.present();
//         this.navCtrl.setRoot('HomePage');
//       }
      
//       });
 

   
  }
}
