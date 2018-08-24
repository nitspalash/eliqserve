import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AuthProvider} from '../../providers/auth-service/authservice';
import {MyApp} from '../../app/app.component';
import { Events } from 'ionic-angular';
/**
 * Generated class for the VieworderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-vieworder',
  templateUrl: 'vieworder.html',
})
export class VieworderPage {
  loginuser:any;
  userId:any;
  userIdSet:any;
  orderArray:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public events: Events,
    public myApp:MyApp,
    public authProvider:AuthProvider) {
      this.loginuser = JSON.parse(localStorage.getItem('userDetails')); 
      this.userId=this.loginuser.id
  
      this.userIdSet=
      {
        "user_id":this.userId
      }
  
      this.authProvider.sellerorderlist(this.userIdSet).subscribe(res => {
       
        console.log(res);
        
        let details = res
        
        if(details.Ack == 1){
          console.log("order list")
          this.orderArray=details.order_list_seller;
          console.log(this.orderArray)
    }
    else{
      this.orderArray = '';
    }
  })
  }

  ionViewDidLoad() {
    this.events.publish('hideFooter', { isHidden: true});
    console.log('ionViewDidLoad VieworderPage');
    this.myApp.abc();
  }
  goTosellerOrderDetails(id)
  {  //alert('here')
    this.navCtrl.push('SellerorderdetailsPage',{param:id})
  }
}
