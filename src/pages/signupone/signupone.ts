import { Component,NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import {FormGroup,FormBuilder,FormControl, AbstractControl,Validators} from '@angular/forms'
import {Storage} from '@ionic/storage'
import { Geolocation } from '@ionic-native/geolocation';
declare var google:any;
// declare var cordova: any;
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
  google:any;
  geo:any;
  GoogleAutocomplete:any;
  autocomplete:any;
  autocompleteItems=[];
  completeAddres:any;
  geocoder: any;
  userDataOne:any;
  latitude:any;
  longitude:any;
  radio:boolean=false;
  today = new Date().toJSON().split('T')[0];
  year:any;
  month:any;
  day:any;
  MaximumBirthDate:any;

  
formGroup:FormGroup;
merchantForm:FormGroup
  constructor(public navCtrl: NavController, public navParams: NavParams,
  public formBuilder:FormBuilder,
  private zone: NgZone,
  private geolocation: Geolocation,
  public alertCtrl:AlertController,
public storage: Storage) {
  
  this.geocoder = new google.maps.Geocoder;

  this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
  this.autocomplete = { input: '' };
  this.autocompleteItems = [];

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

    this.formGroup=new FormGroup ({
      name: new FormControl ('',Validators.required),
      gender: new FormControl (''),
      dob: new FormControl ('',Validators.required),
      utype:new FormControl (''),

        // log:new FormControl (''),
    // bank_details:new FormControl (''),
trade_license:new FormControl (''),
open_time:new FormControl (''),
close_time:new FormControl (''),
delivery:new FormControl (''),
pickup:new FormControl (''),
//paypal_email:new FormControl (''),
store_location:new FormControl (''),
business_name:new FormControl (''),
// bank_acc_no:new FormControl (''),
// bank_rout_no:new FormControl (''),
    })
    this.formGroup.controls['gender'].setValue('male');
    this.formGroup.controls['utype'].setValue(1);
    this.formGroup.controls['delivery'].setValue(true);
    this.formGroup.controls['pickup'].setValue(true);
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
// this.formGroup.value.log='';
// this.formGroup.value.bank_details='';
this.formGroup.value.trade_license='';
this.formGroup.value.open_time='';
this.formGroup.value.close_time='';
this.formGroup.value.pickup='';
this.formGroup.value.delivery='';
this.formGroup.value.store_location='';
//this.formGroup.value.paypal_email='';
// this.formGroup.value.bank_acc_no='';
// this.formGroup.value.bank_rout_no='';

}


  signupTwo(data)
  {
    data.store_latitude=this.latitude;
    data.store_longitude=this.longitude;

    console.log(data);
    console.log (this.formGroup.value.gender)

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
    //  else if(!this.formGroup.value.log)
    //  {
    //   let alert = this.alertCtrl.create({
    //     title: 'Please enter your log name',
    //            buttons: ['ok']
    //   });
    //   alert.present(); 
    //  }declare var google:any;
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

     

    /* else if(!this.formGroup.value.paypal_email)
     {
      let alert = this.alertCtrl.create({
        title: 'Please enter paypal email', 
               buttons: ['ok']
      });
      alert.present(); 
     }*/

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
