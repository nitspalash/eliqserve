import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,Events,ToastController,LoadingController} from 'ionic-angular';
import {AuthProvider} from '../../providers/auth-service/authservice'
import { SocialSharing } from '@ionic-native/social-sharing';
/**
 * Generated class for the SearchResultDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search-result-details',
  templateUrl: 'search-result-details.html',
})
export class SearchResultDetailsPage {
pamater:any;
detailArray:any=[];
imageLink:any;
addCartSet:any;
userId:any;
loginuser:any;
sellerArray:any;
user_exist:any;
istype:any;
rating:any;
showrating:any;
shippingDetailsArray:any;
wish: boolean=false;
  constructor(public navCtrl: NavController, public navParams: NavParams,
  public authProvider:AuthProvider,
  public toastCtrl:ToastController,
  public loadingCtrl:LoadingController,
  public events:Events,
public alertCtrl:AlertController,private socialSharing: SocialSharing) {
    this.pamater=navParams.get('param')
    console.log(this.pamater)
    if(JSON.parse(localStorage.getItem('userDetails')))
    {
      this.loginuser = JSON.parse(localStorage.getItem('userDetails')); 
      this.userId=this.loginuser.id
      // console.log (localStorage.getItem('userDetails'))
      console.log ( this.userId)
    }

let dataSet={
  "prod_id":this.pamater,
  "user_id":this.userId
}

    this.authProvider.productDetails(dataSet).subscribe(res=>{
      console.log(res);
     
      let details = res
      if(details.Ack == 1){
        console.log('hello')
        
          this.wish = details.is_wish;
        
      this.detailArray=details.product
      this.shippingDetailsArray=details.shippingdetails
      this.imageLink=details.image_link
      this.sellerArray=this.detailArray[0].Users;
      console.log(this.detailArray)
      console.log(this.shippingDetailsArray)
      console.log (this.sellerArray);
      console.log('rating',details.rating)
      if (details.rating!='')
      {
      this.rating=details.rating
      this.showrating=1;
            }
            else
            {
              this.showrating=0;
            }

     
      // console.log (this.imageLink);
      

      }
  });


  }

  ionViewDidLoad() {
  	this.events.publish('hideFooter',{isHidden:false});
    console.log('ionViewDidLoad SearchResultDetailsPage');

    if (localStorage.getItem('userDetails'))
{
  this.loginuser = JSON.parse(localStorage.getItem('userDetails'));

this.user_exist=1;

if(this.loginuser.utype==2){
  this.istype=2;
}
console.log('I am here')
}
else{
  this.user_exist=0
  console.log('Please login')
}
  }
  buynow(prodId)
  {

    let loading = this.loadingCtrl.create({
      content: 'Please wait...',
      
    });
 console.log (prodId)
    // alert('Your product added successfully');
 if(JSON.parse(localStorage.getItem('userDetails')))
    {
     
      this.loginuser = JSON.parse(localStorage.getItem('userDetails')); 
      this.userId=this.loginuser.id
      // console.log (localStorage.getItem('userDetails'))
      console.log ( this.userId)
    }
      this.addCartSet={
      "user_id":this.userId,
      "prod_id":prodId
    }
    console.log(this.addCartSet)

    this.authProvider.addToCart(this.addCartSet).subscribe(res=>{
      console.log(res);
     
      let details = res

      if (details.Ack==1)
      {
        loading.dismiss();
    const alert = this.alertCtrl.create({
      title: 'Success',
      subTitle:'Product added to your cart',
      buttons: ['OK']
    });
    alert.present();
    this.navCtrl.push('CartPage')
  }

  else if (details.Ack==0)
  {
    loading.dismiss();
    const alert = this.alertCtrl.create({
      title: details.message,
      buttons: ['OK'],
     
     
    });
    alert.present();

  }
  },(err) => {
    console.log("Error",err);
    loading.dismiss();
    this.presentToast('Error, please try again later.');
  });
  }


  addcart(data)
  {

    let loading = this.loadingCtrl.create({
      content: 'Please wait...',
      
    });
    if(JSON.parse(localStorage.getItem('userDetails')))
    {
     
      this.loginuser = JSON.parse(localStorage.getItem('userDetails')); 
      this.userId=this.loginuser.id
      // console.log (localStorage.getItem('userDetails'))
      console.log ( this.userId)
    }
      this.addCartSet={
      "user_id":this.userId,
      "prod_id":data
    }
    console.log(this.addCartSet)
    console.log (this.addCartSet)
    this.authProvider.addToCart(this.addCartSet).subscribe(res=>{
      console.log(res);
     
      let details = res

      if (details.Ack==1)
      {
        loading.dismiss();
    const alert = this.alertCtrl.create({
      title: 'Success',
      subTitle:'Product added to your cart',
      buttons: ['OK']
    });
    alert.present();
    this.navCtrl.push('HomePage')
  }

  else if (details.Ack==0)
  {
    loading.dismiss();
    const alert = this.alertCtrl.create({
      title: details.message,
      buttons: ['OK'],
     
     
    });
    alert.present();

  }
  }
  ,(err) => {
    console.log("Error",err);
    loading.dismiss();
    this.presentToast('Error, please try again later.');
  }
);
  }

  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
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

    this.authProvider.addwishlist(this.addCartSet).subscribe(res=>{
      console.log(res);
     
      let details = res
      if(details.id)
      {
        this.wish = details.id;
        const alert = this.alertCtrl.create({
          title: 'Wishlist Added Successfully!',
          buttons: ['OK']
        });
        alert.present();
      }
      else{
        this.wish = false;
        const alert = this.alertCtrl.create({
          title: 'Wishlist removed Successfully!',
          buttons: ['OK']
        });
        alert.present();
      }
    //this.navCtrl.push('CartPage')
  });



    this.wish=!this.wish

    console.log('wishlist')
  }
else{
  const alert = this.alertCtrl.create({
    title: 'Please Login first!',
    buttons: ['OK']
  });
  alert.present();
}

  }

  shareInfo(product)
  { 

    console.log(product)

    // this.socialSharing.shareViaEmail('Body', 'Subject', ['palash@natitsolved.com']).then(() => {
    //   // Success!
    // }).catch(() => {
    //   // Error!
    // });
    // this.socialSharing.shareViaFacebook(description,image,link).then(() => {
    //   // Success!
    // }).catch((error) => {
    //   console.log(error)
    //   // Error!
    // });


    
  //   this.socialSharing.shareViaFacebook(description, image, link).
  //   then(() => {
  // alert("Sharing success");
  // // Success!
  // }).catch((error) => {
  //   console.log(error);
  // // Error!
  // alert("Share failed");
  // });
  this.socialSharing.share(product[0].product_name,product[0].description,'link',this.imageLink+product[0].productsimages
[0].name).
  then(() => {
  //alert("Sharing success");
  // Success!
  }).catch(() => {
  // Error!
  //alert("Share failed");
  });
  }

  cartAlert()
  {
    const alert=this.alertCtrl.create({
      title: 'Error',
      subTitle: 'Please Log In To Add Product',
      buttons:['ok']
     });
     alert.present();
  }

  buyAlert()

 {
    const alert=this.alertCtrl.create({
      title: 'Error',
      subTitle: 'Please Log In To buy Product',
      buttons:['ok']
     });
     alert.present();
  }

 
  sellerCartAlert()
  {
    const alert=this.alertCtrl.create({
      title: 'Sorry',
      subTitle: 'As a seller you cannot buy any product',
      buttons:['ok']
     });
     alert.present();
  }


  sellerBuyAlert()
  {
    const alert=this.alertCtrl.create({
      title: 'Sorry',
      subTitle: 'As a seller you cannot buy any product',
      buttons:['ok']
     });
     alert.present();
  }
}
