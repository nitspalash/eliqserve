import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FormGroup,FormControl,FormBuilder,AbstractControl,Validators} from '@angular/forms'
import {AuthProvider} from '../../providers/auth-service/authservice'

/**
 * Generated class for the ForgotPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html',
})
export class ForgotPasswordPage {
  forgetpassForm:FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams,
  public builder:FormBuilder,
  public authProvider:AuthProvider
  ) {

  this.forgetpassForm=new FormGroup({
    email:new FormControl ('',Validators.required)
  })
  }

  forgetpassword(formData)
  {
    console.log (formData)
    this.authProvider.forgotPassword(formData).subscribe(res=>{
      console.log(res);
     
      let details = res
      if(details.ack == 1){
        console.log('hello')
        alert (details.message)

        this.navCtrl.push('LoginPage')
      }else{

        alert ('please enter a valid email-id and password')
       
      }

  });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotPasswordPage');
  }

}
