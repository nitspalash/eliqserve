import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
public storage: Storage) {

    this.formGroup=new FormGroup ({
      name: new FormControl ('',Validators.required),
      gender: new FormControl ('',Validators.required),
      dateOfBirth: new FormControl ('',Validators.required),
      utype:new FormControl ('',Validators.required),
    com_name:new FormControl ('',Validators.required),
    log:new FormControl ('',Validators.required),
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
this.formGroup.value.com_name='';
this.formGroup.value.log='';
}


  signupTwo(data)
  {

    console.log(data);
    console.log (this.formGroup.value.gender)

    

    this.storage.ready().then(() => {
      this.userDataOne=localStorage.setItem ('userDataOne',JSON.stringify(data))
    });
    this.navCtrl.push('SignupTwoPage');
   
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SignuponePage');
  }

}
