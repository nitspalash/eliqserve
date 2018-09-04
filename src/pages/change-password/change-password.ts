import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AuthProvider} from '../../providers/auth-service/authservice';
import {Events} from 'ionic-angular';

/**
 * Generated class for the ChangePasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-change-password',
  templateUrl: 'change-password.html',
})
export class ChangePasswordPage {

  changeForm: FormGroup;
  user_details:any;
  user_id:any;
 
  constructor(public navCtrl: NavController, public navParams: NavParams,
  public builder:FormBuilder,
public authProvider:AuthProvider,
public events:Events,
public alertCtrl:AlertController ) {

    this.user_details =  JSON.parse(localStorage.getItem('userDetails'));
    console.log(this.user_details)
    this.user_id = this.user_details.id;


    this.changeForm = builder.group({
      'current_password': [null, Validators.required],
      'new_password': [null, Validators.required],
      'con_password': [null, Validators.required]
    });

  }
  changepass(formdata)
  {

  formdata.user_id=this.user_id;
  console.log (formdata)


  this.authProvider.changePassword(formdata).subscribe(res=>{
    console.log(res);
   
    let details = res
    if(details.Ack == 1){
      console.log('hello')
      
      const alert = this.alertCtrl.create({
        title: details.message,
           buttons: ['ok']
      });
      alert.present();

      this.navCtrl.setRoot('HomePage')
    }
    else{

      const alert = this.alertCtrl.create({
        title: details.message,
           buttons: ['ok']
      });
      alert.present();
     
    }

});
  }

  ionViewDidLoad() {
    this.events.publish('hideFooter', { isHidden: true});
    console.log('ionViewDidLoad ChangePasswordPage');
  }
  
}
