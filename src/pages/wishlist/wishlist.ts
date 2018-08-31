import { Component } from '@angular/core';
import { IonicPage, NavController,LoadingController, NavParams } from 'ionic-angular';
import {AuthProvider} from '../../providers/auth-service/authservice'
import {Storage} from '@ionic/storage'
import { Events } from 'ionic-angular';
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
addCartSet:any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public authProvider:AuthProvider,public loadingCtrl: LoadingController,
    public events:Events,
    storage:Storage) {
  }

  ionViewDidLoad() {
    this.events.publish('hideFooter', { isHidden: false});
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
            console.log(this.image_link)
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

makeWishlist(id,iswish)
{




  if(JSON.parse(localStorage.getItem('userDetails')))
  {
    this.loginuser = JSON.parse(localStorage.getItem('userDetails')); 
    this.userId=this.loginuser.id
    // console.log (localStorage.getItem('userDetails'))
    console.log ( this.userId)
  }


  if(this.userId)
  {
  //alert(iswish);
  this.addCartSet={
    "user_id":this.userId,
    "prod_id":id,
    "iswish":iswish
    
  }
  let loading = this.loadingCtrl.create({
    content: 'Update wishlist...',
    // duration: 3000
  });

  loading.present();
  this.authProvider.addwishlist(this.addCartSet).subscribe(res=>{
    console.log(res);
   
    let details = res
    if(details.ack == 1)
    {
      
      this.userIdSet=
      {
        "user_id":this.userId
      }
  
      this.authProvider.wishlistall(this.userIdSet).subscribe(res=>{
        console.log(res);
       
        let details = res
        if(details.ack == 1){
          loading.dismiss();
          
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
    else{
      
    }
  //this.navCtrl.push('CartPage')
});



  

  console.log('wishlist')
}
else{

}
}


}
