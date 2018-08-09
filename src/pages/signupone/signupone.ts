import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import {FormGroup,FormBuilder,FormControl, AbstractControl,Validators} from '@angular/forms'
import {Storage} from '@ionic/storage'

/**
 * Generated class for the SignuponePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signupone',
  templateUrl: 'signupone.html',
})
export class SignuponePage {
  valueId:any;
  checked:boolean=false;
  userDataOne:any;
  radio:boolean=false;

  
formGroup:FormGroup;
merchantForm:FormGroup
  constructor(public navCtrl: NavController, public navParams: NavParams,
  public formBuilder:FormBuilder,
  public alertCtrl:AlertController,
public storage: Storage) {

    this.formGroup=new FormGroup ({
      name: new FormControl ('',Validators.required),
      gender: new FormControl ('',Validators.required),
      dob: new FormControl ('',Validators.required),
      utype:new FormControl ('',Validators.required),

        log:new FormControl (''),
    bank_details:new FormControl (''),
trade_license:new FormControl (''),
open_time:new FormControl (''),
close_time:new FormControl (''),
delivery:new FormControl (''),
pickup:new FormControl (''),
paypal_email:new FormControl (''),
store_location:new FormControl (''),
business_name:new FormControl (''),
    })

  
  }
  showForm()
{
  // alert(id);
  this.radio=true;
  // this.valueId=value
  // console.log(this.valueId)
  
}

hideForm()
{
  this.radio=false;
this.formGroup.value.business_name='';
this.formGroup.value.log='';
this.formGroup.value.bank_details='';
this.formGroup.value.trade_license='';
this.formGroup.value.open_time='';
this.formGroup.value.close_time='';
this.formGroup.value.pickup='';
this.formGroup.value.delivery='';
this.formGroup.value.store_location='';
this.formGroup.value.paypal_email='';
}


  signupTwo(data)
  {

    console.log(data);
    // console.log (this.formGroup.value.gender)

    console.log (this.formGroup.value.utype)

    if (this.formGroup.value.utype==2)
    {
     if(!this.formGroup.value.business_name)
     {
      let alert = this.alertCtrl.create({
        title: 'Please enter your company name',
               buttons: ['ok']
      });
      alert.present();
     
     } 
     else if(!this.formGroup.value.log)
     {
      let alert = this.alertCtrl.create({
        title: 'Please enter your log name',
               buttons: ['ok']
      });
      alert.present(); 
     }
     else if(!this.formGroup.value.store_location)
     {
      let alert = this.alertCtrl.create({
        title: 'Please enter your storelocation',
               buttons: ['ok']
      });
      alert.present(); 
     }
     else if(!this.formGroup.value.open_time)
     {
      let alert = this.alertCtrl.create({
        title: 'Please enter your open time',
               buttons: ['ok']
      });
      alert.present(); 
     }
     else if(!this.formGroup.value.close_time)
     {
      let alert = this.alertCtrl.create({
        title: 'Please enter your close time',
               buttons: ['ok']
      });
      alert.present(); 
     }

     else if(!this.formGroup.value.delivery && !this.formGroup.value.pickup)
     {
      let alert = this.alertCtrl.create({
        title: 'Please select delivery and/or pickup',
               buttons: ['ok']
      });
      alert.present(); 
     }

     else if(!this.formGroup.value.trade_license)
     {
      let alert = this.alertCtrl.create({
        title: 'Please enter trade license number',
               buttons: ['ok']
      });
      alert.present(); 
     }

     else if(!this.formGroup.value.bank_details)
     {
      let alert = this.alertCtrl.create({
        title: 'Please enter bank details',
               buttons: ['ok']
      });
      alert.present(); 
     }

     else if(!this.formGroup.value.paypal_email)
     {
      let alert = this.alertCtrl.create({
        title: 'Please enter paypal email', 
               buttons: ['ok']
      });
      alert.present(); 
     }

     else
     {
      this.navCtrl.push('SignupTwoPage');
     }
    } else
    {
      this.navCtrl.push('SignupTwoPage');
    }

    this.storage.ready().then(() => {
      this.userDataOne=localStorage.setItem ('userDataOne',JSON.stringify(data))
    });
   
   
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SignuponePage');
  }

}
