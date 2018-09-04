import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Storage} from '@ionic/storage'
import {FormGroup,FormControl,FormBuilder,AbstractControl,Validators} from '@angular/forms'
/**
 * Generated class for the SignupTwoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup-two',
  templateUrl: 'signup-two.html',
})
export class SignupTwoPage {
  data:string;
  ph_number:any;
  input:any;
  isEnabled:boolean=false;
  notFocused = false;
  formGroup: FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public storage:Storage) 
    {
      this.formGroup=new FormGroup
    ({
      phone: new FormControl('', [Validators.required, Validators.minLength(10)])
        
    }); 
  }
 
  signupThree(phone)
  {
    
    console.log(phone)
    

    this.storage.ready().then(() => {
      this.ph_number=localStorage.setItem ('ph_number',JSON.stringify(phone))
    });

    this.navCtrl.push('SignupThreePage');
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupTwoPage');
  }

}
