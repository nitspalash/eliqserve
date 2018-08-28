import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import {AuthProvider} from '../../providers/auth-service/authservice'
import {Storage} from '@ionic/storage'
import { trigger } from '@angular/core/src/animation/dsl';
import {Events} from 'ionic-angular'
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
  quantity:any;
  updateIdSet:any;
  sellerArray:any;
    constructor(public navCtrl: NavController, public navParams: NavParams,
    public authProvider:AuthProvider,
    public alertCtrl:AlertController,
    public events:Events,
    storage:Storage
  ) {
  this.cartList();
  }
  
  cartList()
  {
  
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
              console.log('product')
            }
            else{
              this.cartArray='';
              console.log('no product')
              }
         
          this.totalPrice=details.total_price;
          this.totalItem=details.total_item;
          this.quantity=details.quantity;
        

        
          // console.log( this.cartArray);  
          // console.log( this.totalPrice);
          // console.log( this.totalItem);
          
          // this.navCtrl.push('LoginPage')
        }
          
    });
  
    }
  
    ionViewDidLoad() {
      this.events.publish('hideFooter', { isHidden: false});
      console.log('ionViewDidLoad CartPage');
    
    }
  
    increment(index)
    {
      
this.updateIdSet={
  "id":this.cartArray[index].id,
  "quantity":this.cartArray[index].quantity,
  "increment":"",
  "prd_id":this.cartArray[index].prd_id
  }
  console.log (this.updateIdSet)
  
  this.authProvider.updateCart(this.updateIdSet).subscribe(res=>{
    console.log(res);
    console.log('hello')
   
    let details = res
    if(details.Ack == 1){
      this.cartArray[index].quantity=details.quantity 
      this.cartArray[index].price=details.price 
      //  this.cartArray[index].total_price
      this.totalPrice=details.totalcartprice 
       console.log (details.totalcartprice)
       console.log(this.cartArray[index].total_price)
    }
  })
  
      // console.log (index)
      console.log (this.cartArray[index].id)
      // this.cartArray[index].quantity=this.cartArray[index].quantity + 1;
  
  
    }
  
  
    decrement(index)
    {
      if(this.cartArray[index].quantity != 1)
      {
      this.updateIdSet={
        "id":this.cartArray[index].id,
        "quantity":this.cartArray[index].quantity,
        "increment":1,
        "prd_id":this.cartArray[index].prd_id
        }
        
        this.authProvider.updateCart(this.updateIdSet).subscribe(res=>{
          console.log(res);
         
          let details = res
          if(details.Ack == 1){
            this.cartArray[index].quantity=details.quantity 
            this.cartArray[index].price=details.price 
            // this.cartArray[index].total_price=details.totalcartprice 
            this.totalPrice=details.totalcartprice 
          }
        })
      } else
      {
        alert("Quantity can't be zero, please click on remove to delete from your order ")
      }
      
  
  
  
    //   if (this.cartArray[index].quantity>1)
    //   {
   
    //   console.log (index)
    //   console.log (this.cartArray[index].quantity)
    //   this.cartArray[index].quantity=this.cartArray[index].quantity - 1;
    // }
    // else
    // {
    //   alert("Quantity can't be zero, please click on remove to delete from your order ")
    // }
    
  
    }
  
  
    remove(index)
    {
      let alert = this.alertCtrl.create({
        title: 'Remove Item',
        message: 'Are you sure to remove this item',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
                   
          },
          {
            text: 'Ok',
            handler: () => {
  
              console.log (this.cartArray[index])
              console.log (this.cartArray[index].id)
              let idSet=
              {
                "id":this.cartArray[index].id
              }
          
              console.log (idSet)
      this.authProvider.removeCart(idSet).subscribe(res=>{
        console.log(res);
        console.log('hello')
        let details = res
        if(details.Ack == 1){
  
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
              this.quantity=details.quantity;
            
                }else{
                  console.log('ack 0')
                }
            })
  
        }
      })
    }
  }]
      });
      alert.present();
    }
    goForCheckout()
    {
      this.navCtrl.push ('CheckoutPage');
    }
}
