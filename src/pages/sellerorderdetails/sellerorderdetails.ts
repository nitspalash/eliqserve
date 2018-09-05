import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Platform,LoadingController,ToastController,AlertController} from 'ionic-angular';
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
    public loadingCtrl:LoadingController,
    public alertCtrl:AlertController,
    public toastCtrl:ToastController,
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

  else{
    console.log('error')
  }
})
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SellerorderdetailsPage');
  }
  
  order_status(id,status)
  {

    let loading = this.loadingCtrl.create({
      content: 'Updating your order status...',
      // duration: 6000
    });
    loading.present();
    this.orderstatus={
      "order_id":id,
      "order_status":status
    }
    this.authProvider.sellerorderStatus(this.orderstatus).subscribe(res => {
     
      console.log(res);
      
      let details = res
      
      if(details.Ack == 1){
        loading.dismiss();
        this.navCtrl.push('VieworderPage',{param:id})
    
      }
      else
      {
        loading.dismiss();

        let alert = this.alertCtrl.create({
          message: res.message,
                 buttons: ['ok']
        });
        alert.present(); 
      }
    },(err) => {
     
      console.log("Error",err);
      loading.dismiss();
      this.presentToast('Error,please try again later.');
    });
  }
  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  onChange(status,id)
  {
    let loading = this.loadingCtrl.create({
      content: 'Updating your order status...',
      // duration: 6000
    });
    loading.present();
    console.log(status,id);

    this.orderstatus={
      "order_id":id,
      "order_status":status
    }

    this.authProvider.sellerorderStatus(this.orderstatus).subscribe(res => {
     
      console.log(res);
      
      let details = res
      
      if(details.Ack == 1){
        loading.dismiss();
        this.navCtrl.push('VieworderPage',{param:id})
    
      }
      else
      {
        loading.dismiss();
      }
    },(err) => {
     
      console.log("Error",err);
      loading.dismiss();
      this.presentToast('Error,please try again later.');
    });

  }
}
