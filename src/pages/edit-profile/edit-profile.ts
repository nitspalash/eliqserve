import { Component,NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,Platform } from 'ionic-angular';
import {FormBuilder,FormControl,FormGroup,Validators,AbstractControl} from '@angular/forms'
import {AuthProvider} from '../../providers/auth-service/authservice'
import {Storage} from'@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation';
declare var google:any;
/**
 * Generated class for the EditProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {
  formGroup:FormGroup;
  user_details:any;
  user_id:any;
  lastYear:any;
  year:any;
  month:any;
  day:any;
  MaximumBirthDate:any;
  MinmumBirthDate:any;
  minyear:any;

  google:any;
  geo:any;
  GoogleAutocomplete:any;
  autocomplete:any;
  autocompleteItems=[];
  completeAddres:any;
  geocoder: any;
  latitude:any;
  longitude:any;

  
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public formBuilder:FormBuilder, 
  public authProvider:AuthProvider,
  public alertCtrl:AlertController,
  private zone: NgZone,
  private geolocation: Geolocation,
  public platform: Platform,
  public storage:Storage,

) {

  this.geocoder = new google.maps.Geocoder;

  this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
  this.autocomplete = { input: '' };
  this.autocompleteItems = [];

  platform.registerBackButtonAction(() => {
    this.navCtrl.setRoot ('VieworderPage');
  });
  
  this.year = new Date().getFullYear()-18;
  this.month = new Date().getMonth()+1;
  this.day = new Date().getDate();

  if(this.day<10){
    this.day='0'+this.day
} 

if(this.month<10){
  this.month='0'+this.month
} 

this.MaximumBirthDate = this.year+'-'+"12"+'-'+"31";
console.log(this.MaximumBirthDate)
console.log (new Date().getMonth());




  
      this.formGroup = new FormGroup ({
        first_name: new FormControl ('', Validators.required),
     
      phone: new FormControl ('', Validators.required),
      address: new FormControl ('', Validators.required),
      city: new FormControl ('', Validators.required),
      country: new FormControl ('', Validators.required),
      postcode: new FormControl ('', Validators.required),
      dob: new FormControl ('', Validators.required),

      store_location:new FormControl (''),
      merchant_id: new FormControl ('', Validators.required),
      public_key: new FormControl ('', Validators.required),
      private_key: new FormControl ('', Validators.required),
      });


      this.user_details =  JSON.parse(localStorage.getItem('userDetails'));
      console.log(this.user_details)
      this.user_id = this.user_details.id;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProfilePage');
   

    if (this.storage.get('userDetails'))
    {

      console.log(this.user_details.dob.split('T')[0])
   this.formGroup.controls['first_name'].setValue(this.user_details.first_name);
   this.formGroup.controls['phone'].setValue(this.user_details.phone);
   this.formGroup.controls['city'].setValue(this.user_details.city);
   this.formGroup.controls['address'].setValue(this.user_details.address);
   this.formGroup.controls['country'].setValue(this.user_details.country);
   this.formGroup.controls['store_location'].setValue(this.user_details.store_location);
   this.formGroup.controls['dob'].setValue(this.user_details.dob.split('T')[0]);
   this.formGroup.controls['postcode'].setValue(this.user_details.postcode);
   this.formGroup.controls['merchant_id'].setValue(this.user_details.merchant_id);
   this.formGroup.controls['public_key'].setValue(this.user_details.public_key);
   this.formGroup.controls['private_key'].setValue(this.user_details.private_key);
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
  this.formGroup.controls['merchant_id'].setValue('');
   this.formGroup.controls['public_key'].setValue('');
   this.formGroup.controls['private_key'].setValue('');
}

  }




  submitDetails (formdata)
  {
    formdata.store_latitude=this.latitude;
    formdata.store_longitude=this.longitude;

    formdata.user_id=this.user_id;
    console.log(formdata);
    this.authProvider.editProfile(formdata).subscribe(res => {
     
      console.log(res);
      console.log('hello');
      let details = res
      
      if(details.Ack == 1){

        this.storage.ready().then(() => {
          localStorage.setItem('userDetails', JSON.stringify(res.userupdatedata));
           console.log("UserDetails", JSON.stringify(res.userupdatedata));
        });
        const alert = this.alertCtrl.create({
          title: 'Your Profile Updated Successfully',
           buttons: ['OK']
         });
          alert.present();
          this.navCtrl.setRoot('ProfilePage')
            }
          });

}


updateSearchResults() {
    
  if (!this.formGroup.value.store_location) {
    this.autocompleteItems = [];
    return;
  }
  this.GoogleAutocomplete.getPlacePredictions({ input: this.formGroup.value.store_location},
    (predictions, status) => {
      this.autocompleteItems = [];
      this.zone.run(() => {
        predictions.forEach((prediction) => {
          console.log('prediction',prediction)
          console.log(predictions)
          this.autocompleteItems.push(prediction);
        });
      });
    });
   
}

selectSearchResult(item) {
  this.autocompleteItems = [];
  
  console.log('item',item)
  this.completeAddres = item.description;
  console.log('address',this.completeAddres);
  this.formGroup.get('store_location').setValue(this.completeAddres);


  this.geo = item;
  console.log(this.geo);
  this.geoCode(this.geo); 
}



geoCode(address:any) {
  let geocoder = new google.maps.Geocoder();
  geocoder.geocode({ 'address': this.completeAddres }, (results, status) => {
  this.latitude = results[0].geometry.location.lat();
  this.longitude = results[0].geometry.location.lng();
  console.log("lat: " + this.latitude + ", long: " + this.longitude);
 });
}


}
