import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,LoadingController } from 'ionic-angular';
import {AuthProvider} from '../../providers/auth-service/authservice';
import { Events } from 'ionic-angular';
/**
 * Generated class for the OrderDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order-detail',
  templateUrl: 'order-detail.html',
})
export class OrderDetailPage {
  disabled:boolean=false;
  parameter:any
  orderSet:any;
  loginuser:any;
  userId:any;
  orderDetailsArray:any;
  buttonName:any;
  cancelOrderSet:any;
  deliverarray:any;
  shippingarray:any;
  shiparray:any;
 
  shipping_charges:any;
  grandtotal:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
  public authProvider:AuthProvider,
  public alertCtrl:AlertController,
  public loadingCtrl:LoadingController,
public events:Events) {

    
this.parameter=this.navParams.get ('param')
console.log(this.parameter)

this.loginuser = JSON.parse(localStorage.getItem('userDetails')); 
this.userId=this.loginuser.id

this.orderSet={
  "order_id":this.parameter,
  "user_id":this.userId
}
console.log (this.orderSet)

this.authProvider.orderDetails(this.orderSet).subscribe(res => {
     
  console.log(res);
  
  let details = res
  
  if(details.Ack == 1){
console.log ('orderDetails')
this.orderDetailsArray=details.order_details
console.log (this.orderDetailsArray)
console.log (this.orderDetailsArray[0].order_status)

this.deliverarray=this.orderDetailsArray[0].deliver;
console.log ('deliver',this.deliverarray);
this.shippingarray=this.orderDetailsArray[0].shiping;
console.log('shi',this.shippingarray);

this.shiparray=this.orderDetailsArray[0].order_details
console.log('charge',this.shiparray[0].shipping_charge)
this.shipping_charges=this.shiparray[0].shipping_charge
this.grandtotal=this.orderDetailsArray[0].total_price+this.shipping_charges
console.log(this.orderDetailsArray[0].total_price)
console.log('grand',this.grandtotal)


// if ((this.orderDetailsArray[0].order_status)=="P")
// {
// this.buttonName="Pending"
// }
// else if ((this.orderDetailsArray[0].order_status)=="S")
// {
// this.buttonName="Shipped"
// }

// else if ((this.orderDetailsArray[0].order_status)=="D")
// {
// this.buttonName="Delivered"
// }
// else if ((this.orderDetailsArray[0].order_status)=="A")
// {
// this.buttonName="Seller Accepted The Order"
// }
// else if ((this.orderDetailsArray[0].order_status)=="R")
// {
// this.buttonName="Seller Rejected The Order"
// }
// else if ((this.orderDetailsArray[0].order_status)=="C")
// {
// this.buttonName="Order Cancelled By User"
// }

  }
})
  }

  ionViewDidLoad() {
    this.events.publish('hideFooter', { isHidden: false});
    console.log('ionViewDidLoad OrderDetailPage');
  }

  goToCartPage()
  {
    this.navCtrl.push('CartPage')
    console.log('cart')
  }

  cancelOrder()
  {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...',
      // duration: 6000
    });
  
    loading.present();


    this.disabled=true

    
this.cancelOrderSet=
{
  "order_id":this.parameter,
  "order_status":"C"
}
console.log (this.cancelOrderSet)



this.authProvider.cancelOrder(this.cancelOrderSet).subscribe(res => {
  
  // let loading = this.loadingCtrl.create({
  //   content: 'Please wait...',
  //   duration: 6000
  // });

  // loading.present();

  
  console.log ('cancel order')
  console.log(res);
  
  let details = res
  
  if(details.Ack == 1){
    
   
    console.log('orderset',this.orderSet)

    this.authProvider.orderDetails(this.orderSet).subscribe(res => {
     
      console.log(res);
      
      let details = res
      
      if(details.Ack == 1){ 
        loading.dismiss();
    console.log ('orderDetails')
    this.orderDetailsArray=details.order_details
    console.log (this.orderDetailsArray)
    console.log (this.orderDetailsArray[0].order_status)
    
    this.deliverarray=this.orderDetailsArray[0].deliver;
    console.log ('deliver',this.deliverarray);
    this.shippingarray=this.orderDetailsArray[0].shiping;
    console.log('shi',this.shippingarray);

    const alert = this.alertCtrl.create({
      title: 'Status Updated',
         buttons: ['ok']
    });
    alert.present();
    
    } 
    else
    {
      const alert = this.alertCtrl.create({
        title:'something went wrong',
           buttons: ['ok']
      });
      alert.present();
      
      loading.dismiss();
    }
    })
    
    
    // this.navCtrl.setRoot('HomePage');
  }
});
  }

}
