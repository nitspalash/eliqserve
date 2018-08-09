import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
  passwordmatch =true;
itemEmail:any;
email:any;

  formGroup: FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams,
  public builder:FormBuilder,
public authProvider:AuthProvider) {


this.formGroup=new FormGroup
({
  password:new FormControl ('',Validators.required),
  con_password: new FormControl ('',Validators.required)
});
  }




  signupFive(data)
  
  { this.disabled=true;
    this.item=JSON.parse(localStorage.getItem('userDataOne'));
    console.log( this.item)
 this.name=this.item.name;
 this.gender=this.item.gender;
 this.dateOfBirth=this.item.dateOfBirth;
this.itemEmail=JSON.parse(localStorage.getItem('email_address'));
this.email=this.itemEmail.email

console.log(this.email)
console.log(this.name)
console.log(this.gender)
console.log(this.dateOfBirth)
    console.log (localStorage.getItem('ph_number'))
    console.log (localStorage.getItem('email_address'))
    data.first_name=this.name;
    data.gender= this.gender;
    data.dob=this.dateOfBirth;
    data.phone=localStorage.getItem('ph_number');
    data.email=this.email
    console.log(data)

    
    
    this.authProvider.signup(data).subscribe(res=>{
      console.log(res.details);
     
      let detailResponse = res.details
      if(detailResponse.ack == 1){
        console.log('hello')
       alert (detailResponse.message)
    
        this.navCtrl.push('SignupFivePage')
        alert ('Please check your mail for otp');
      }
      else if(detailResponse.ack == 0){
       alert (detailResponse.message)
         this.navCtrl.push('LoginPage')
      }
  });
 
    
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
