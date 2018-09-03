import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Platform,AlertController } from 'ionic-angular';
import {FormBuilder,FormControl,FormGroup,AbstractControl,Validators} from '@angular/forms'
import {AuthProvider} from '../../providers/auth-service/authservice'
import {Storage} from '@ionic/storage';
import { Events } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public formGroup: FormGroup;
  userDetails:any;
  detailsTReponse:any;
  public footerIsHidden: boolean = true;
  public unregisterBackButtonAction: any;
  loginType:any;
  token_id:any;
  devicetype:any;
  lat:any;
  lng:any;
  users:any;
  email:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
 public authProvider:AuthProvider,
  private builder: FormBuilder,
  public events: Events,
  public platform: Platform,
  public storage: Storage,
  public alertCtrl:AlertController,
  private fb: Facebook,
  private googlePlus: GooglePlus,) {

  
 
  platform.registerBackButtonAction(() => {
    this.navCtrl.setRoot ('HomePage');
  });

    this.formGroup = builder.group({
      'email': ['', Validators.compose([Validators.required])],
      'password': ['', Validators.compose([Validators.required])]
    });
  }

  login (formData)
  {

    if (localStorage.getItem('currentlatlong'))
    {
    this.lat=JSON.parse(localStorage.getItem('lat'))
    this.lng=JSON.parse(localStorage.getItem('lng'))
    }
    else
    {
      this.lat='';
      this.lng=''

    }


    formData.device_type=this.devicetype;
    formData.device_token_id=this.token_id;
    formData.latitude=this.lat
    formData.longitude=this.lng
    console.log ('form',formData);
    this.authProvider.login(formData).subscribe(res=>{
      console.log(res);
     
      // let details = res
      if(res.ack == 1){
        console.log('hello')
      this.detailsTReponse=res.details
      console.log (this.detailsTReponse)


        this.storage.ready().then(() => {
          this.userDetails=localStorage.setItem('userDetails', JSON.stringify(this.detailsTReponse));
          console.log(JSON.parse(localStorage.getItem('userDetails')));


          this.loginType=JSON.parse(localStorage.getItem('userDetails'))
          if (this.loginType.utype==1)
          {
            this.navCtrl.push('HomePage')
          } 
          else if (this.loginType.utype==2)
          {
           console.log('seller')
            this.navCtrl.push('VieworderPage')
          }
      })
     


    }
      else{

        let alert = this.alertCtrl.create({
          title: res.message,
                 buttons: ['ok']
        });
        alert.present(); 
        this.formGroup.reset();
      }

  });
}

forgotPassword()
{
  this.navCtrl.push('ForgotPasswordPage')
}
  signupPage()
  {
    this.navCtrl.push('SignuponePage')
  }



  ionViewDidLoad() {
     this.events.publish('hideFooter', {isHidden: true});
    console.log('ionViewDidLoad LoginPage');

    this.token_id= localStorage.getItem('TOKEN');
    console.log('token',this.token_id)
    if(this.platform.is('ios')){
      this.devicetype="ios";
    }else{
      this.devicetype="android";
    }

    //this.initializeBackButtonCustomHandler();
  }
  ionViewWillLeave() {   
    // this.navCtrl.setRoot ('HomePage');
    // Unregister the custom back button action for this page
   // this.unregisterBackButtonAction && this.unregisterBackButtonAction();
}


facebookSignIn() {
  this.fb.login(['public_profile', 'email'])
    .then(res => {
      console.log("FBDATA",res);
      if(res.status === "connected") {
        //this.isLoggedIn = true;
        this.getUserDetail(res.authResponse.userID);
      } else {
       // this.isLoggedIn = false;
      }
    })
    .catch(e => console.log('Error logging into Facebook', e));
}

getUserDetail(userid) {
  this.fb.api("/"+userid+"/?fields=id,email,name,picture,gender",["public_profile"])
    .then(res => {
      console.log("FBDATA",res);
      this.users = res;
      
   let param={
    "facebook_id": this.users.id,
    "email":this.users.email,
    //"gender": this.users.gender,
    "first_name": this.users.name,
    "device_type": this.devicetype,
    "device_token_id": this.token_id,
     
   };
   console.log("DATATATTATATAT",param);
     
      this.authProvider.facebooklogin(param).subscribe((res) => { //console.log(result);
       this.detailsTReponse = res;
       console.log("FBRESULT",res);
       if(res.ack== 1)
       {
     
        localStorage.setItem('userDetails',JSON.stringify(res.details));
        this.navCtrl.push('HomePage')
       
       }
       else{
        
        let alert = this.alertCtrl.create({
          title: res.message,
                 buttons: ['ok']
        });
        alert.present(); 
        this.formGroup.reset();
         
       }
        
     })

    })
    
}


googleplus() {
  //alert();
  this.googlePlus.login({})
    .then(res => {
      console.log("GOOGLEPLUSDATA",res);
      this.email = res.email;
    })
    .catch(err => console.error(err));
}




}
