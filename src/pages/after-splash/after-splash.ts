import { Component } from '@angular/core';
import { IonicPage,LoadingController, NavController, NavParams,AlertController } from 'ionic-angular';
 import { Diagnostic } from '@ionic-native/diagnostic';
import { Platform,Events } from 'ionic-angular';
// import {AuthProvider} from '../../providers/auth-service/authservice'
import { Geolocation } from '@ionic-native/geolocation';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { Network } from '@ionic-native/network';

import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder';
import {Storage} from '@ionic/storage'
/**
 * Generated class for the AfterSplashPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-after-splash',
  templateUrl: 'after-splash.html',
})
export class AfterSplashPage {
  
  public currentaddress:any;
  public address:any;
  loginuser:any;
  constructor(public navCtrl: NavController,
    // public authProvider:AuthProvider, 
    public navParams: NavParams,
    public alertCtrl:AlertController,
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,
    public storage: Storage,
    private diagnostic: Diagnostic,
    public platform: Platform,
    private locationAccuracy: LocationAccuracy,
    private network: Network,
    public events: Events,
    public loadingCtrl: LoadingController
  ) {
    events.publish('hideFooter', { isHidden: true});
     let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      console.log('network was disconnected :-(');
     });

  }
  loginPage()
  {
    

    this.loginuser = JSON.parse(localStorage.getItem('userDetails')); 
   
    if(JSON.parse(localStorage.getItem('userDetails'))){
          
    if(this.loginuser.utype==1){
      console.log('buyer')
    this.navCtrl.setRoot ('HomePage')
    
   
    }
    else if(this.loginuser.utype==2){
      
      console.log('seller')
    this.navCtrl.setRoot ('VieworderPage')
    
    }
  }
  else
  {
    this.navCtrl.setRoot ('HomePage')
  }
  


  }


//   checkLocation()
// {
// this.platform.ready().then((readySource) => {

// this.diagnostic.isLocationEnabled().then(
// (isAvailable) => {
// console.log('Is available? ' + isAvailable);

// switchToLocationSettings() 
// alert('Is available? ' + isAvailable);
// }).catch( (e) => {
// console.log(e);
// alert(JSON.stringify(e));
// });


// });
// }


// switchToLocationSettings() {
   
//     
// }

  ionViewDidLoad() {
    

   
   
    this.platform.ready().then((readySource) => {




      
      this.diagnostic.isLocationEnabled().then(
      (isAvailable) => {
        if(!isAvailable)
        {
          this.locationAccuracy.canRequest().then((canRequest: boolean) => {

            if(canRequest) {
            // the accuracy option will be ignored by iOS
            this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
            () => {
              let loading = this.loadingCtrl.create({
                content: 'Getting your location...',
                duration: 5000
              });
            
              loading.present();
              this.fetchlocation()
              
            },
            error => {
              this.ionViewDidLoad();
            }
            );
            }
            
            });
        }
        else{
          let loading = this.loadingCtrl.create({
            content: 'Getting your location...',
            duration: 5000
          });
        
          loading.present();
          this.fetchlocation();
          //alert(ty)
          
        }
      console.log('Is available? ' + isAvailable);
      //alert('Is available? ' + isAvailable);
      }).catch( (e) => {
      console.log(e);
      //alert(JSON.stringify(e));
      });
      
      
      });


    console.log('ionViewDidLoad AfterSplashPage');
    console.log('currentaddress',this.currentaddress);
    
//     let successCallback = (isAvailable) => { console.log('Is available? ' + isAvailable); };
// let errorCallback = (e) => console.error(e);

// // only android
// this.diagnostic.isGpsLocationEnabled().then(successCallback, errorCallback);

// this.diagnostic.isGpsLocationEnabled()
// .then((state) => {
//   if (state == this.diagnostic.locationMode.LOCATION_OFF) {
//     let confirm = this.alertCtrl.create({
//       title: '<b>Location</b>',
//       message: 'Location information is unavaliable on this device. Go to Settings to enable Location for Untapped.',
//       buttons: [

//         {
//           text: 'GO TO SETTINGS',
//           handler: () => {
//             this.diagnostic.switchToLocationSettings();

//           }
//         }
//       ]
//     });
//     confirm.present();
//   } else {


//    console.log('GPS in on')
//   }
// }).catch(e => console.error(e));
}


fetchlocation(){
  this.geolocation.getCurrentPosition().then((resp) => {
     

    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
  };
  
  this.nativeGeocoder.reverseGeocode(resp.coords.latitude, resp.coords.longitude, options)
    .then((result: NativeGeocoderReverseResult[]) => {
     // console.log(JSON.stringify(result[0]))
      this.storage.ready().then(() => {
        
        localStorage.setItem('currentlatlong', JSON.stringify(resp.coords));
        localStorage.setItem('currentaddress', JSON.stringify(result[0]));
        var address = JSON.stringify(result[0])
        //this.currentaddress = ;
        this.address = JSON.parse(localStorage.getItem('currentaddress'));
        console.log('address',address)
        
        console.log(this.currentaddress);
      
      if(this.address.thoroughfare)
      {
        this.currentaddress = this.address.thoroughfare +',';
      }
      if(this.address.subLocality)
      {
        this.currentaddress = this.currentaddress + this.address.subLocality +',';
      }
      if(this.address.locality)
      {
        this.currentaddress = this.currentaddress+ this.address.locality +',';
      }
      if(this.address.subAdministrativeArea)
      {
        this.currentaddress = this.currentaddress + this.address.subAdministrativeArea +',';
      }
      if(this.address.administrativeArea)
      {
        this.currentaddress = this.currentaddress + this.address.administrativeArea +',';
      }
      if(this.address.countryName)
      {
        this.currentaddress = this.currentaddress + this.address.countryName +',';
      }
      if(this.address.postalCode)
      {
        this.currentaddress = this.currentaddress + this.address.postalCode;
      }
      // this.navCtrl.setRoot ('HomePage')

      this.loginuser = JSON.parse(localStorage.getItem('userDetails')); 
   
      if(JSON.parse(localStorage.getItem('userDetails'))){
            
      if(this.loginuser.utype==1){
        console.log('buyer')
      this.navCtrl.setRoot ('HomePage')
      
     
      }
      else if(this.loginuser.utype==2){
        
        console.log('seller')
      this.navCtrl.setRoot ('VieworderPage')
      
      }
    }
    else
    {
      this.navCtrl.setRoot ('HomePage')
    }
    
        console.log(address);
        
    })
    })
    .catch((error: any) => console.log(error));


    console.log(resp)
    // resp.coords.latitude
    // resp.coords.longitude
   }).catch((error) => {
     console.log('Error getting location', error);
   });
}



// checkLocation()
// {

//   var address = JSON.parse(localStorage.getItem('currentaddress'));
//   console.log(address)
  
//   console.log(this.currentaddress);

// if(address.thoroughfare)
// {
//   this.currentaddress = address.thoroughfare +',';
// }
// if(address.subLocality)
// {
//   this.currentaddress = this.currentaddress + address.subLocality +',';
// }
// if(address.locality)
// {
//   this.currentaddress = this.currentaddress+ address.locality +',';
// }
// if(address.subAdministrativeArea)
// {
//   this.currentaddress = this.currentaddress + address.subAdministrativeArea +',';
// }
// if(address.administrativeArea)
// {
//   this.currentaddress = this.currentaddress + address.administrativeArea +',';
// }
// if(address.countryName)
// {
//   this.currentaddress = this.currentaddress + address.countryName +',';
// }
// if(address.postalCode)
// {
//   this.currentaddress = this.currentaddress + address.postalCode;
// }
 

// }

}
