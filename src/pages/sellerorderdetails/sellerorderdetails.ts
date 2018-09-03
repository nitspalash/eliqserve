import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Platform } from 'ionic-angular';
import {AuthProvider} from '../../providers/auth-service/authservice'
/**
 * Generated class for the SellerorderdetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sellerorderdetails',
  templateUrl: 'sellerorderdetails.html',
})
export class SellerorderdetailsPage {
  parameter:any
  orderSet:any;
  loginuser:any;
  userId:any;
  item:any=[];
  orderDetailsArray:any;
  deliver:any;
  shiping:any;
  shiparray:any;
  orderstatus:any;
  shipping_charges:any;
  grandtotal:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public platform:Platform,
    public authProvider:AuthProvider) {

          
      platform.registerBackButtonAction(() => {
        this.navCtrl.setRoot ('VieworderPage');
      });

this.parameter=this.navParams.get ('param')
console.log(this.parameter)

this.loginuser = JSON.parse(localStorage.getItem('userDetails')); 
this.userId=this.loginuser.id

this.orderSet={
  "order_id":this.parameter,
  "user_id":this.userId
}
console.log (this.orderSet)

this.authProvider.sellerorderDetails(this.orderSet).subscribe(res => {
     
  console.log(res);
  
  let details = res
  
  if(details.Ack == 1){
console.log ('orderDetails')
this.orderDetailsArray=details.seller_order_details
this.shiparray=this.orderDetailsArray[0].order_details
console.log('charge',this.shiparray[0].shipping_charge)
this.shipping_charges=this.shiparray[0].shipping_charge
this.grandtotal=this.orderDetailsArray[0].total_price+this.shipping_charges
console.log('grand',this.grandtotal)

console.log('shiparray',this.shiparray)
console.log ('47',this.orderDetailsArray)
this.item = this.orderDetailsArray[0];
this.deliver = this.item.deliver;
this.shiping = this.item.shiping;
console.log('item',this.deliver);
  }
})
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SellerorderdetailsPage');
  }
  
  order_status(id,status)
  {
    this.orderstatus={
      "order_id":id,
      "order_status":status
    }
    this.authProvider.sellerorderStatus(this.orderstatus).subscribe(res => {
     
      console.log(res);
      
      let details = res
      
      if(details.Ack == 1){
        this.navCtrl.push('VieworderPage',{param:id})
    
      }
    })
  }


  onChange(status,id)
  {
    console.log(status,id);

    this.orderstatus={
      "order_id":id,
      "order_status":status
    }

    this.authProvider.sellerorderStatus(this.orderstatus).subscribe(res => {
     
      console.log(res);
      
      let details = res
      
      if(details.Ack == 1){
        this.navCtrl.push('VieworderPage',{param:id})
    
      }
    })

  }
}
