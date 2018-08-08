import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Storage} from '@ionic/storage'

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
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public storage:Storage) 
    {
      
  }
 
  signupThree()
  {
    
    console.log(this.data)
    

    this.storage.ready().then(() => {
      this.ph_number=localStorage.setItem ('ph_number',this.data)
    });

    this.navCtrl.push('SignupThreePage');
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupTwoPage');
  }

}
