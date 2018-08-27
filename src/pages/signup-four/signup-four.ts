import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,AlertController } from 'ionic-angular';
import {FormGroup,FormControl,FormBuilder,AbstractControl,Validators} from '@angular/forms'
import {AuthProvider} from '../../providers/auth-service/authservice'
/**
 * Generated class for the SignupFourPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup-four',
  templateUrl: 'signup-four.html',
})
export class SignupFourPage {
  disabled:boolean= false;
  item:any;
  name:any;
  gender:any;
  dateOfBirth:any;
  utype:any
  // log:any;
  bank_details:any;
trade_license:any;
open_time:any;
close_time:any;
delivery:any;
pickup:any;
paypal_email:any;
store_location:any;
business_name:any;
// bank_acc_no:any;
// bank_rout_no:any;
lat:any;
lng:any;
itemphone:any;
phone:any;

  passwordmatch =true;
itemEmail:any;
email:any;

  formGroup: FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public loadingCtrl:LoadingController,
    public alertCtrl:AlertController,
  public builder:FormBuilder,
public authProvider:AuthProvider) {

console.log('lat',JSON.parse(localStorage.getItem('currentlatlong')))
this.formGroup=new FormGroup
({
  password:new FormControl ('',Validators.required),
  con_password: new FormControl ('',Validators.required)
});

this.lat=JSON.parse(localStorage.getItem('lat'))
this.lng=JSON.parse(localStorage.getItem('lng'))

  }




  signupFive(data)
  
  { 


    this.item=JSON.parse(localStorage.getItem('userDataOne'));
    console.log( this.item)
 this.name=this.item.name;
 this.gender=this.item.gender;
 this.dateOfBirth=this.item.dob;
 this.utype=this.item.utype;
//  this.log=this.item.log;
//  this.bank_details=this.item.bank_details;
// this.bank_acc_no=this.item.bank_acc_no;
// this.bank_rout_no=this.item.bank_rout_no;
 this.trade_license=this.item.trade_license;;
 this.open_time=this.item.open_time;
 this.close_time=this.item.close_time;
 this.delivery=this.item.delivery;
 this.pickup=this.item.pickup;
 this.paypal_email=this.item.paypal_email;
 this.store_location=this.item.store_location;
 this.business_name=this.item.business_name;


this.itemEmail=JSON.parse(localStorage.getItem('email_address'));
this.email=this.itemEmail.email

this.itemphone=JSON.parse(localStorage.getItem('ph_number'));
this.phone=this.itemphone.phone


console.log(this.email)
console.log(this.name)
console.log(this.gender)
console.log(this.dateOfBirth)
    console.log (localStorage.getItem('ph_number'))
    console.log (localStorage.getItem('email_address'))
    data.first_name=this.name;
    data.gender= this.gender;
    data.dob=this.dateOfBirth;

    data.utype=this.utype;
    // data.log=this.log;

    // data.bank_details=this.bank_details
    //  data.bank_acc_no=this.bank_acc_no
    //   data.bank_rout_no=this.bank_rout_no
    data.trade_license=this.trade_license
    data.open_time=this.open_time
    data.close_time=this.close_time
    data.delivery=this.delivery
    data.pickup=this.pickup
    data.paypal_email=this.paypal_email
    data.store_location=this.store_location
    data.business_name=this.business_name

    data.phone=this.phone;
    data.email=this.email
    data.latitude=this.lat
    data.longitude=this.lng
    console.log(data)

      let loading = this.loadingCtrl.create({
      content: 'Please wait...',
      // duration: 6000
    });
  
    loading.present();
    
    this.authProvider.signup(data).subscribe(res=>{
      console.log(res.details);
     
      let detailResponse = res.details
      if(detailResponse.ack == 1){
        console.log('hello')     
      loading.dismiss();

if (this.utype==2)
{
  let alert = this.alertCtrl.create({
    title: 'Please wait for admin approval',
           buttons: ['ok']
  });
  alert.present();
  this.navCtrl.push('LoginPage')
}

else if (this.utype==1)
{
  let alert = this.alertCtrl.create({
    title: 'Please check your mail for otp',
           buttons: ['ok']
  });
  alert.present();
            this.navCtrl.setRoot('SignupFivePage')
        
      }
    }
      else if(detailResponse.ack == 0){
        loading.dismiss();
      
       let alert = this.alertCtrl.create({
        title: detailResponse.message,
               buttons: ['ok']
      });
      alert.present();
         this.navCtrl.push('LoginPage')
      }
    
  })
 
    
  }

  public checkpassword(conpass,frmval)
  {
    console.log(frmval.password);
    console.log(conpass);
    if(frmval.password == conpass)
    {
     this.passwordmatch = true;
    }
    else{
      this.passwordmatch = false;
    }
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupFourPage');
  }

}
