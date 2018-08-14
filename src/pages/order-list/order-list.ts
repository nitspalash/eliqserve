import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AuthProvider} from '../../providers/auth-service/authservice';

/**
 * Generated class for the OrderListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order-list',
  templateUrl: 'order-list.html',
})
export class OrderListPage {
  loginuser:any;
  userId:any;
  userIdSet:any;
  orderArray:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
  public authProvider:AuthProvider) {
    console.log('hello');
    this.loginuser = JSON.parse(localStorage.getItem('userDetails')); 
    this.userId=this.loginuser.id

    this.userIdSet=
    {
      "user_id":this.userId
    }

    this.authProvider.orderlist(this.userIdSet).subscribe(res => {
     
      console.log(res);
      
      let details = res
      
      if(details.Ack == 1){
        console.log("order list")
        this.orderArray=details.orderlist
        console.log(this.orderArray)
  }
})
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderListPage');
  }

  goToOrderDetails(id)
  {
    this.navCtrl.push('OrderDetailPage',{param:id})
  }

  goToCartPage()
  {
    this.navCtrl.push('CartPage')
    console.log('cart')
  }



}
