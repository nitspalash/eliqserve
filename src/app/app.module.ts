import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Diagnostic } from '@ionic-native/diagnostic';
import { AuthProvider } from '../providers/auth-service/authservice';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
// import {AfterSplashPage} from '../pages/after-splash/after-splash';
import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { IonicStorageModule } from '@ionic/storage';
import { Network } from '@ionic-native/network';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FormsModule } from '@angular/forms';
import {AboutPage} from '../pages/about/about'
import { ImagePicker } from '@ionic-native/image-picker';

import { SocialSharing } from '@ionic-native/social-sharing';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder';
import { LocationAccuracy } from '@ionic-native/location-accuracy';

import { FilePath } from '@ionic-native/file-path';
import { File } from '@ionic-native/file';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
// import {AppRate} from '@ionic-native/app-rate';
import { Push } from '@ionic-native/push';
@NgModule({
  declarations: [
    MyApp,
    HelloIonicPage,
    AboutPage
    
    // AfterSplashPage
  ],
  imports: [
    BrowserModule,HttpModule,HttpClientModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp),
    
    
  ],
  exports: [
    AboutPage
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HelloIonicPage,
    // AfterSplashPage
  ],
  providers: [
    AuthProvider,
    Diagnostic,
    StatusBar,
    SplashScreen,
    ImagePicker,
    {provide: ErrorHandler, useClass: IonicErrorHandler},

    Camera,
    FileTransfer,
    FilePath,
    File,
    SocialSharing,
    Geolocation,
    NativeGeocoder,
    LocationAccuracy,
    Network,
    // AppRate,
    Push
  ]
})
export class AppModule {}
