import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Platform,AlertController } from 'ionic-angular';
import {FormBuilder,FormControl,FormGroup,AbstractControl,Validators} from '@angular/forms'
import {AuthProvider} from '../../providers/auth-service/authservice'
import {Storage} from '@ionic/storage';
import { Events } from 'ionic-angular';
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
  constructor(public navCtrl: NavController, public navParams: NavParams,
 public authProvider:AuthProvider,
  private builder: FormBuilder,
  public events: Events,
  public platform: Platform,
  public storage: Storage,
public alertCtrl:AlertController,) {

  
 
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
    formData.device_type=this.devicetype;
    formData.device_token_id=this.token_id;
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

// initializeBackButtonCustomHandler(): void {
  

//     this.unregisterBackButtonAction = this.platform.registerBackButtonAction(function(event){
//         console.log('Prevent Back Button Page Change');
//         this.navCtrl.setRoot ('HomePage');
//     }, 100); // Priority 101 will override back button handling (we set in app.component.ts) as it is bigger then priority 100 configured in app.component.ts file */
// }  
}
