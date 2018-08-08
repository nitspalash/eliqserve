import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AuthProvider} from '../../providers/auth-service/authservice'
import {Storage} from '@ionic/storage'

/**
 * Generated class for the WishlistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-wishlist',
  templateUrl: 'wishlist.html',
})
export class WishlistPage {


loginuser:any;
userId:any;
userIdSet:any;
wishlist:any= [];
image_link:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public authProvider:AuthProvider,
    storage:Storage) {
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad WishlistPage');

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

    this.authProvider.wishlistall(this.userIdSet).subscribe(res=>{
      console.log(res);
     
      let details = res
      if(details.ack == 1){
        
          if(details.wishlist.length > 0)
          {
            this.wishlist=details.wishlist
            this.image_link = details.image_link;
          }
          else{
            this.wishlist='';
            }
       
       console.log(this.wishlist);
        
        // this.navCtrl.push('LoginPage')
      }
        
  });
  }

  goToProductDetails(data)
{
  //console.log("product details")
  //console.log(data)

this.navCtrl.push('SearchResultDetailsPage',{param:data})



}

}
