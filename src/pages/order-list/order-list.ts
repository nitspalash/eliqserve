import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController} from 'ionic-angular';
import {AuthProvider} from '../../providers/auth-service/authservice';
// import { AppRate } from '@ionic-native/app-rate';
//import { Ionic2RatingModule } from 'ionic2-rating';
import { Events } from 'ionic-angular';
import { CssSelector } from '@angular/compiler';
import { Title } from '@angular/platform-browser/src/browser/title';
import { debounce } from 'ionic-angular/util/util';
import { THROW_IF_NOT_FOUND } from '@angular/core/src/di/injector';
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
  ChooseButton:boolean= false;
  product:any;
  loginuser:any;
  reviewArray:any;
  userId:any;
  userIdSet:any;
  orderArray:any;
  itemnumber:any;
  rate:any;
  comment:any;
  idSet:any;
  productId:any;
  imagelink:any;
  // disableBtn:boolean=false;
  isShow:any;
  //className: string = 'alertstar';
  className:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
  public authProvider:AuthProvider,
  public alertCtrl: AlertController,
  public events:Events
) {

  // console.log('rate',this.rate)
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
        
        this.imagelink=details.image_link
        console.log(this.imagelink)
        console.log(this.orderArray)
    
  }
  else{
    this.orderArray = '';
  }
})


  }

  show(prod_id,item) {
    this.isShow =1;
    this.product=prod_id
// this.itemnumber=item;
    item.ChooseButton = true;
    console.log("listId", prod_id);
  
    
  }

  hide() {
    this.isShow =0;
  }

  submit()
  {
    console.log(this.comment)
    console.log(this.rate)
    this.idSet={
"user_id":this.userId,
"prod_id": this.product,
"rating":this.rate,
"review":this.comment,
}

console.log(this.idSet)

    this.isShow =0;
    this.authProvider.productRating(this.idSet).subscribe(res => {
     
  console.log(res);                       
  let details = res
  console.log("review")
  if(details.Ack == 1)
  {
    this.authProvider.orderlist(this.userIdSet).subscribe(res => {
     
      console.log(res);
      
      let details = res
      
      if(details.Ack == 1){
        console.log("order list")
        
        this.orderArray=details.orderlist
        
        this.imagelink=details.image_link
        console.log(this.imagelink)
        console.log(this.orderArray)
    
  }
})
  }
  })     
 
    this.comment='';
    this.rate='';
  }


  ionViewDidLoad() {
    this.events.publish('hideFooter', { isHidden: false});
    console.log('ionViewDidLoad OrderListPage');
  }

  goToOrderDetails(id)
  {
    this.navCtrl.push('OrderDetailPage',{param:id})
    // console.log('rate',this.rate)
    
  }

  goToCartPage()
  {
    this.navCtrl.push('CartPage')
    console.log('cart')
  }

  


}
