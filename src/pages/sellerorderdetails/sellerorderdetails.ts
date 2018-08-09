import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
  orderstatus:any;
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

this.authProvider.sellerorderDetails(this.orderSet).subscribe(res => {
     
  console.log(res);
  
  let details = res
  
  if(details.Ack == 1){
console.log ('orderDetails')
this.orderDetailsArray=details.seller_order_details
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


  onChange(status)
  {
    //alert(status);
  }
}
