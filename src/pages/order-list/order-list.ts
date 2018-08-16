import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController} from 'ionic-angular';
import {AuthProvider} from '../../providers/auth-service/authservice';
// import { AppRate } from '@ionic-native/app-rate';
import { Ionic2RatingModule } from 'ionic2-rating';
import { Events } from 'ionic-angular';
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
  rate:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
  public authProvider:AuthProvider,
  public alertCtrl: AlertController,
  public events:Events
) {

  console.log('rate',this.rate)
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

  review()
  {
  const alert = this.alertCtrl.create({
    title: 'Rate your speech:',

    cssClass: 'alertstar',
    enableBackdropDismiss:true,

    inputs:[
      {
        name:'comment',
        placeholder:'Comments'
      }
    ],


    // inputs: [
    //      { text: '1', handler: data => {
           
          
    //        this.rating(1,data.comment),
    //       console.log(JSON.stringify(data)),
    //       console.log(data.comment)

    //      }},
    //      { text: '2', handler: data => { this.rating(2,data.comment);}},
    //      { text: '3', handler: data => { this.rating(3,data.comment);}},
    //      { text: '4', handler: data => { this.rating(4,data.comment);}},
    //      { text: '5', handler: data => { this.rating(5,data.comment);}}
    // ]
});
alert.present();


  
 
  }

  rating(i,data)
  {
console.log(i)
console.log(data)


  }

  ionViewDidLoad() {
    this.events.publish('hideFooter', { isHidden: false});
    console.log('ionViewDidLoad OrderListPage');
  }

  goToOrderDetails(id)
  {
    this.navCtrl.push('OrderDetailPage',{param:id})
    console.log('rate',this.rate)
  }

  goToCartPage()
  {
    this.navCtrl.push('CartPage')
    console.log('cart')
  }



}
