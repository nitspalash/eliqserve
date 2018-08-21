import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav,AlertController } from 'ionic-angular';
import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import{AfterSplashPage} from '../pages/after-splash/after-splash';
import {HomePage} from '../pages/home/home'
import {AboutPage} from '../pages/about/about'
import { Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {Storage} from '@ionic/storage'
import {TabsPage} from '../pages/tabs/tabs';
import { Push, PushObject, PushOptions } from '@ionic-native/push';

export interface PageInterface {
 
  tabName?: string;
  tabComponent?: any;
 
}
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  // rootPage = HelloIonicPage;
  pages: Array<{title: string, component: any}>;
  user_exist:any;
  loginuser:any;
  istype:any;
  token:any;
  public footerIsHidden: boolean = false;
  constructor(
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public storage: Storage,
    public events: Events,
    private push: Push,
    public alertCtrl: AlertController
    
  ) {
  	 
    this.eve();
    this.abc();
    this.initializeApp();
    this.hideSplashScreen();
    events.subscribe('user:created', (time) => {
     
      console.log('Welcome', 'at', time);
    })
   
    if(this.token==""){
      
      setInterval(() => {
        alert(localStorage.getItem('TOKEN'));
           this.initPushNotification();
        }, 500);
    }


  }

  eve()
  {
    this.events.subscribe('hideFooter', (data) => {
      this.footerIsHidden = data.isHidden;
    })
  }

  abc()
  {

    this.loginuser = JSON.parse(localStorage.getItem('userDetails')); 
   
    if(JSON.parse(localStorage.getItem('userDetails'))){

      this.user_exist=1;
      //  console.log(this.loginuser) ;
         
    if(this.loginuser.utype==1){
    this.istype=1;
        console.log (this.istype)
   
    }else if(this.loginuser.utype==2){
    this.istype=2;
    console.log (this.istype)
  
   this.eve();
    }



  }
  
  else{
    this.user_exist=0;
  }

}
  initializeApp() {
    this.platform.ready().then(() => {

     this.initPushNotification();


      this.statusBar.styleDefault();
      this.nav.setRoot('AfterSplashPage');
      // this.splashScreen.hide();
    });
  }
  hideSplashScreen() {
    if (this.splashScreen) {
      setTimeout(() => {
        this.splashScreen.hide();
      }, 100);
     }
    }
  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    // this.nav.setRoot(page.component);
  
  }


  initPushNotification() {
    if (!this.platform.is('cordova')) {
      console.warn('Push notifications not initialized. Cordova is not available - Run in physical device');
      return;
    }
    const options: PushOptions = {
      android: {
        senderID: '609215899596',
        icon: "assets/img/alert-icon",
        sound:true,
        vibrate:true,
        messageKey:'message',
        titleKey:'body',
        forceShow:true,
      },
      ios: {
        alert: 'true',
        badge: false,
        sound: 'true'
      },
      windows: {}
    };
    const pushObject: PushObject = this.push.init(options);
  
    pushObject.on('registration').subscribe((registration: any) => {
      console.log('Device registered', registration);


      localStorage.setItem('TOKEN', registration.registrationId);

      this.token= localStorage.getItem('TOKEN');
      
    });
    pushObject.on('notification').subscribe((data: any) => {
      console.log('message -> ' + data.body);
      console.log(data.additionalData.foreground);
      //if user using app and push notification comes
      if (data.additionalData.foreground) {
        console.log(data.additionalData.foreground);
        // if application open, show popup
        let confirmAlert = this.alertCtrl.create({
          title: 'New Notification',
          message: data.message,
          buttons: [{
            text: 'Ignore',
            role: 'cancel'
          }, {
            text: 'View',
            handler: () => {
              //TODO: Your logic here
              this.nav.setRoot('NotificationSettingsPage', { message: data.message });
            }
          }]
        });
        confirmAlert.present();
      } else {
        //if user NOT using app and push notification comes
        //TODO: Your logic on click of push notification directly
        //this.nav.setRoot('NotificationSettingsPage', {message: data.message });
        console.log('Push notification clicked');
      }
    });
    pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
  
  }







  public login()
  {
    this.nav.push ('LoginPage');
  }

  public signup()
  {
    this.nav.push ('SignuponePage');
  }

  public orderList()
  {
    this.nav.push ('OrderListPage')
  }

  public sellerOrderList()
  {
    this.nav.push ('VieworderPage')
  }

  public cart()
  {
    this.nav.push ('CartPage')
  }

  public addProduct()
  {
    this.nav.push ('AddProductPage')
  }

  public profile()
  {
    this.nav.push ('ProfilePage')
  }

public buyerprofile()
{
  this.nav.push ('BuyerProfilePage')
}

  public listProduct()
  {
    this.nav.push ('ListProductPage')
  }
  public changePassword()
  {
    this.nav.push ('ChangePasswordPage')
  }

public gohome()
{
  this.nav.push ('HomePage')
}

public goSearch()
{
  this.nav.push ('FilterPage')
}

public wishlist()
{
  this.nav.push ('WishlistPage')
}

public goOrder()
{
  this.nav.push ('OrderListPage') 
}

public goSellerProfile()
{
  this.nav.push ('ProfilePage') 
}

public goBuyerProfile()
{
  this.nav.push ('BuyerProfilePage') 
}

public goWishlist()
{
  console.log('wishlist')
}
  public logout(){
    
    this.storage.ready().then(() => {
      const data=localStorage.getItem("userDetails");
localStorage.removeItem('userDetails');

// localStorage.setItem('userDetails', "");
   this.nav.setRoot('HomePage');
   this.user_exist=0;

  });
}

public earning()
{
  this.nav.push ('EarningreportPage')
}
public reviews()
{
  this.nav.push ('ReviewsPage')
}
public settings()
{
  this.nav.push ('SettingsPage')
}




}
