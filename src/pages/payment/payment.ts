import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,LoadingController} from 'ionic-angular';
import { Braintree, PaymentUIOptions,PaymentUIResult } from '@ionic-native/braintree';
import {AuthProvider} from '../../providers/auth-service/authservice'
import {FormControl,FormBuilder,Validators,FormGroup} from '@angular/forms';
/**
 * Generated class for the PaymentPage page.
 *
 * Ionic pages and navigation.
 */
const BRAINTREE_TOKEN = 'sandbox_c763pzf4_3rpbrc5n25v99mrt';
@IonicPage()
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})



export class PaymentPage {
  billParam:any;
  shipParam:any;
  loginuser:any;
  userId:any;
  userIdSet:any;
  totalPrice:any;
  totalItem:any;
  shippingCharges:any;
  cartArray:any;
  shipdata:any;
  // billdata:any;
  cartvalue:any;
  years:any;
  month:any;
  email:any;
  phone:any;
  public formGroup:FormGroup;


  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public authProvider:AuthProvider,
    public alertCtrl:AlertController,
    public loadingCtrl:LoadingController,
    private braintree: Braintree) {

      this.billParam=navParams.get ('param1');
      this.shipParam=navParams.get ('param2');
      console.log (this.billParam)
      console.log (this.shipParam)


      this.formGroup=new FormGroup({
        firstName:new FormControl (''),
        lastName:new FormControl (''),
        month:new FormControl (''),
        year:new FormControl (''),
        cvv:new FormControl (''),
        number:new FormControl (''),
      })
      
      if(JSON.parse(localStorage.getItem('userDetails')))
      {
        this.loginuser = JSON.parse(localStorage.getItem('userDetails')); 
        this.userId=this.loginuser.id
        // console.log (localStorage.getItem('userDetails'))
        console.log ( this.userId)
      }


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
          console.log( this.totalPrice);
          console.log( this.totalItem);
          this.shippingCharges=this.cartArray[0].shipping_charge;
          console.log('ship',this.shippingCharges) 
        }
          
    });


this.month=["Jan","Feb","Mar","Apr","May","Jun","Jul","Augt","Sep","Oct","Nov","Dec"];





    var range = [];
    let lastYear=  new Date().getFullYear()+10;

    console.log(lastYear);
    let currentDate= new Date().getFullYear();
    console.log(currentDate);
    
    for (let year=currentDate;year<=lastYear;year++)
    {
            range.push(year)
     
    }
    this.years = range;
    console.log(this.years)


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentPage');
  }

  // paymentSucess()
  // {
  //   this.navCtrl.push('PaymentSuccessfulPage')
  // }


  payment(data){

    

this.loginuser = JSON.parse(localStorage.getItem('userDetails')); 
        this.userId=this.loginuser.id
        this.email=this.loginuser.email
        this.phone=this.loginuser.phone

// console.log(this.shipParam.ship_id)
this.shipdata=JSON.parse(this.shipParam);
// this.billdata=JSON.parse(this.billParam);
console.log (this.shipdata)
// console.log (this.billdata)


data.ship_id=this.shipdata.ship_id,
  data.ship_fname=this.shipdata.ship_fname,
  data.ship_lnam=this.shipdata.ship_lname,
  data.ship_mob=this.shipdata.ship_mob,
  data.ship_pin=this.shipdata.ship_pin,
  data.shipadd_one=this.shipdata.shipadd_one,
  data.shipadd_two=this.shipdata.shipadd_two,
  data.ship_city=this.shipdata.ship_city,
  data.ship_state=this.shipdata.ship_state,
  data.ship_country=this.shipdata.ship_country,

  /*data.billing_id=this.billdata.billing_id,
  data.bill_fname=this.billdata.bill_fname,
  data.bill_lname=this.billdata.bill_lname,
  data.bill_mob=this.billdata.bill_mob,
  data.bill_pin=this.billdata.bill_pin,
  data.billadd_one=this.billdata.billadd_one,
  data.billadd_two=this.billdata.billadd_two,
  data.bill_city=this.billdata.bill_city,
  data.bill_state=this.billdata.bill_state,
  data.bill_country=this.billdata.bill_country,*/
  data.email=this.email,
  data.phone=this.phone,
  data.user_id=this.userId,

  console.log(data);

  let loading = this.loadingCtrl.create({
    content: 'Please wait...',
    duration: 6000
  });

  loading.present();

  this.authProvider.checkout(data).subscribe(res=>{
          console.log('Hello')
          
          console.log(res);
         
          let details = res
          if(details.ack == 1){
            console.log ('checkout')
    
            loading.dismiss()
    
            const alert = this.alertCtrl.create({
              title: details.message,
                 buttons: ['ok']
            });
            alert.present();
            this.navCtrl.setRoot('PaymentSuccessfulPage');
          } 
          else
          {
            loading.dismiss()
            const alert = this.alertCtrl.create({
              title: details.message,
                 buttons: ['ok']
            });
            alert.present();
          }
          
          
         
        });
         
  }

  
}
