import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AuthProvider} from '../../providers/auth-service/authservice'
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
  parameter:any
  orderSet:any;
  loginuser:any;
  userId:any;
  orderDetailsArray:any;
  buttonName:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
  public authProvider:AuthProvider) {

    
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
    console.log('ionViewDidLoad OrderDetailPage');
  }

}
