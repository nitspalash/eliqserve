import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,LoadingController} from 'ionic-angular';
import {SignupTwoPage} from '../signup-two/signup-two'
import moment from 'moment';
import {AuthProvider} from '../../providers/auth-service/authservice'


/**
 * Generated class for the SignupFivePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup-five',
  templateUrl: 'signup-five.html',
})
export class SignupFivePage {
  timeInSeconds:any;
  remainingTime: any;
  time:any;
  displayTime:any;
  hasStarted:boolean;
  hasFinished:boolean;
  runTimer:boolean;
  data:string;
  otpSet:any;
  itemphone:any;
  phone:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public alertCtrl: AlertController,
    public authProvider:AuthProvider,
  public loadingCtrl:LoadingController) {

    this.itemphone=JSON.parse(localStorage.getItem('ph_number'));
this.phone=this.itemphone.phone

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupFivePage');
    this.initTimer();
    this.startTimer();
  }

  startTimer() {
    this.runTimer = true;
   this.hasStarted = true;
   this.timerTick();
 }


 timerTick() {
  setTimeout(() => {

    if (!this.runTimer) { return; }
    this.remainingTime--;
    this.displayTime = this.getSecondsAsDigitalClock(this.remainingTime);
    if (this.remainingTime > 0) {
      this.timerTick();
    }
    else {
      this.hasFinished = true;
      alert('times out,Please re-enter your email address')
      this.navCtrl.setRoot('SignupThreePage');
    }
  }, 1000); //1000 time_in_ms
}
  initTimer() {
   
    if (!this.timeInSeconds) { 
      this.timeInSeconds = 1800; 
    }
  
    this.time = this.timeInSeconds;
    this.runTimer = false;
    this.hasStarted = false;
    this.hasFinished = false;
    this.remainingTime = this.timeInSeconds;
    
    this.displayTime = this.getSecondsAsDigitalClock(this.remainingTime);



  }
  getSecondsAsDigitalClock(inputSeconds: number) {
    var sec_num = parseInt(inputSeconds.toString(), 10);
    // var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num) / 60);
    var seconds = sec_num - (minutes * 60);
    // var hoursString = '';
    var minutesString = '';
    var secondsString = '';
    // hoursString = (hours < 10) ? "0" + hours : hours.toString();
    minutesString = (minutes < 10) ? "0" + minutes : minutes.toString();
    secondsString = (seconds < 10) ? "0" + seconds : seconds.toString();
    return minutesString + ':' + secondsString;
  }

  finalSubmit()
  {

    let loading = this.loadingCtrl.create({
      content: 'Validating your otp...',
      // duration: 6000
    });
  
    loading.present();

    console.log(this.data)
    let currentDateTime = moment().format("MM-DD-YYYY HH:mm:ss")


    console.log (currentDateTime);
    this.otpSet={
      "phone":this.phone,
      "otp":this.data,
      "current_datetime":currentDateTime,
      };
  
console.log (this.otpSet)



 this.authProvider.verifyOtp(this.otpSet).subscribe(res => {
     
      console.log(res.details);
      console.log('hello');
      let detailsResponse = res.details
      console.log(detailsResponse);
      
      if(detailsResponse.ack == 1){
        loading.dismiss();
        const alert = this.alertCtrl.create({
          title: 'Your Profile Created Successfully',
           buttons: ['OK']
        
         });
          alert.present();
          this.navCtrl.push('LoginPage')
            } 
            else if (detailsResponse.ack == 0){
              loading.dismiss();
              alert(detailsResponse.message)
            }
          });

}


  }


