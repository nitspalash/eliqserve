import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Platform } from 'ionic-angular';
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
  public footerIsHidden: boolean = true;
  public unregisterBackButtonAction: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
 public authProvider:AuthProvider,
  private builder: FormBuilder,
  public events: Events,
  public platform: Platform,
public storage: Storage) {
 
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
    this.authProvider.login(formData).subscribe(res=>{
      console.log(res);
     
      // let details = res
      if(res.ack == 1){
        console.log('hello')
let detailsTReponse=res.details
console.log (detailsTReponse)

// let abc=localStorage.setItem('abc', JSON.stringify(res.details['utype']));
// console.log (abc)
        this.storage.ready().then(() => {
          this.userDetails=localStorage.setItem('userDetails', JSON.stringify(detailsTReponse));
          console.log(JSON.parse(localStorage.getItem('userDetails')));
        this.navCtrl.push('HomePage')

      })
    }
      else{

        alert ('please enter a valid email-id and password')
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
     this.events.publish('hideFooter', { isHidden: true});
    console.log('ionViewDidLoad LoginPage');
    //this.initializeBackButtonCustomHandler();
  }
  ionViewWillLeave() {   this.navCtrl.setRoot ('HomePage');
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
