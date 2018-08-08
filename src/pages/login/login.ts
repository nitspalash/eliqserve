import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FormBuilder,FormControl,FormGroup,AbstractControl,Validators} from '@angular/forms'
import {AuthProvider} from '../../providers/auth-service/authservice'
import {Storage} from '@ionic/storage'
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


  constructor(public navCtrl: NavController, public navParams: NavParams,
 public authProvider:AuthProvider,
  private builder: FormBuilder,
public storage: Storage) {

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
    console.log('ionViewDidLoad LoginPage');
  }

}
