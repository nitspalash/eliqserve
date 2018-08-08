import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
 import { Diagnostic } from '@ionic-native/diagnostic';
import { Platform } from 'ionic-angular';
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
  ) {
  
    
     let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      console.log('network was disconnected :-(');
     });

  }
  loginPage()
  {
    this.navCtrl.push ('HomePage')
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
            () => alert('Request successful'),
            error => alert('Error requesting location permissions'+JSON.stringify(error))
            );
            }
            
            });
        }
      console.log('Is available? ' + isAvailable);
      alert('Is available? ' + isAvailable);
      }).catch( (e) => {
      console.log(e);
      alert(JSON.stringify(e));
      });
      
      
      });




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






checkLocation()
{

  var address = JSON.parse(localStorage.getItem('currentaddress'));
  console.log(address)
  
  console.log(this.currentaddress);

if(address.thoroughfare)
{
  this.currentaddress = address.thoroughfare +',';
}
if(address.subLocality)
{
  this.currentaddress = this.currentaddress + address.subLocality +',';
}
if(address.locality)
{
  this.currentaddress = this.currentaddress+ address.locality +',';
}
if(address.subAdministrativeArea)
{
  this.currentaddress = this.currentaddress + address.subAdministrativeArea +',';
}
if(address.administrativeArea)
{
  this.currentaddress = this.currentaddress + address.administrativeArea +',';
}
if(address.countryName)
{
  this.currentaddress = this.currentaddress + address.countryName +',';
}
if(address.postalCode)
{
  this.currentaddress = this.currentaddress + address.postalCode;
}
  // administrativeArea
  // :
  // "West Bengal"
  // countryCode
  // :
  // "IN"
  // countryName
  // :
  // "India"
  // locality
  // :
  // "New Town"
  // postalCode
  // :
  // "700156"
  // subAdministrativeArea
  // :
  // "Kolkata"
  // subLocality
  // :
  // "Newtown"
  // thoroughfare
  // :
  // "Street no 0360"


}

}
