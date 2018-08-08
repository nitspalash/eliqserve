import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AuthProvider} from '../../providers/auth-service/authservice'
import {Storage} from '@ionic/storage'
/**
 * Generated class for the CartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {


loginuser:any;
userId:any;
userIdSet:any;
cartArray:any;
totalPrice:any;
totalItem:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
  public authProvider:AuthProvider,
  storage:Storage
) {

   

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
        
          if(details.cart.length > 0)
          {
            this.cartArray=details.cart
          }
          else{
            this.cartArray='';
            }
       
        this.totalPrice=details.total_price;
        this.totalItem=details.total_item;
        console.log( this.cartArray);  
        console.log( this.totalPrice);
        console.log( this.totalItem);
        
        // this.navCtrl.push('LoginPage')
      }
        
  });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartPage');
  }

  goForCheckout()
  {
    this.navCtrl.push ('CheckoutPage')
  }
}
