import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Storage} from '@ionic/storage'
import {FormGroup,FormControl,FormBuilder,AbstractControl,Validators} from '@angular/forms'
/**
 * Generated class for the SignupThreePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup-three',
  templateUrl: 'signup-three.html',
})
export class SignupThreePage {
  email:any;
  user_email:any;
  formGroup: FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public storage:Storage,
    public builder:FormBuilder
  ) {

    this.formGroup=new FormGroup
    ({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9._]+[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$')]))

    });

  }
  signupFour(data)
  
  {
    console.log(data);

    this.storage.ready().then(() => {
      // this.user_email=localStorage.setItem ('email',this.email)
      this.user_email=localStorage.setItem ('email_address',JSON.stringify(data))
    });

    this.navCtrl.push('SignupFourPage');
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupThreePage');
  }

}
