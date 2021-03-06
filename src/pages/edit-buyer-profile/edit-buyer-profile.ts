import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,LoadingController } from 'ionic-angular';
import {FormBuilder,FormControl,FormGroup,Validators,AbstractControl} from '@angular/forms'
import {AuthProvider} from '../../providers/auth-service/authservice';
import {Storage} from '@ionic/storage'
/**
 * Generated class for the EditBuyerProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-buyer-profile',
  templateUrl: 'edit-buyer-profile.html',
})
export class EditBuyerProfilePage {
  formGroup:FormGroup;
  user_details:any;
  user_id:any;
  year:any;
  month:any;
  day:any;
  MaximumBirthDate:any;
  MinmumBirthDate:any;
  minyear:any;

  
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public formBuilder:FormBuilder, 
  public authProvider:AuthProvider,
  public alertCtrl:AlertController,
  public loadingCtrl:LoadingController,
public storage: Storage) {


  this.year = new Date().getFullYear()-18;
  this.month = new Date().getMonth();
  this.day = new Date().getDay();

  if(this.day<10){
    this.day='0'+this.day
} 
if(this.month<10){
  this.month='0'+this.month
} 

this.MaximumBirthDate = this.year+'-'+"12"+'-'+"31";
console.log(this.MaximumBirthDate)



    this.formGroup = new FormGroup ({
      first_name: new FormControl ('', Validators.required),
   
    phone: new FormControl ('', Validators.required),
    address: new FormControl ('', Validators.required),
    city: new FormControl ('', Validators.required),
    country: new FormControl ('', Validators.required),
    postcode: new FormControl ('', Validators.required),
    dob: new FormControl ('', Validators.required)
    });

    this.user_details =  JSON.parse(localStorage.getItem('userDetails'));
    console.log(this.user_details)
    this.user_id = this.user_details.id;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditBuyerProfilePage');

    if (this.storage.get('userDetails'))
    {
   this.formGroup.controls['first_name'].setValue(this.user_details.first_name);
   this.formGroup.controls['phone'].setValue(this.user_details.phone);
   this.formGroup.controls['city'].setValue(this.user_details.city);
   this.formGroup.controls['address'].setValue(this.user_details.address);
   this.formGroup.controls['country'].setValue(this.user_details.country);
   this.formGroup.controls['dob'].setValue(this.user_details.dob.split('T')[0]);
   this.formGroup.controls['postcode'].setValue(this.user_details.postcode);
  }
else
{
  this.formGroup.controls['first_name'].setValue('');
  this.formGroup.controls['phone'].setValue('');
  this.formGroup.controls['city'].setValue('');
  this.formGroup.controls['address'].setValue('');
  this.formGroup.controls['country'].setValue('');
  this.formGroup.controls['dob'].setValue('');
  this.formGroup.controls['postcode'].setValue('');
}
  }

  submitDetails (formdata)
  {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...',
      // duration: 6000
    });
  
    loading.present();

    formdata.user_id=this.user_id;
    console.log(formdata);
    this.authProvider.editProfile(formdata).subscribe(res => {
     
      console.log(res);
      console.log('hello');
      let details = res
      
      if(details.Ack == 1){
        loading.dismiss();

        this.storage.ready().then(() => {
          localStorage.setItem('userDetails', JSON.stringify(res.userupdatedata));
           console.log("UserDetails", JSON.stringify(res.userupdatedata));
        });
        const alert = this.alertCtrl.create({
          title: 'Your Profile Updated Successfully',
           buttons: ['OK']
         });
          alert.present();
          this.navCtrl.setRoot('BuyerProfilePage')
            }
            else
            {
              alert ('something went wrong')
              loading.dismiss();
            }
          });

}

}
