import { Component,NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FormGroup,FormBuilder,FormControl, AbstractControl,Validators} from '@angular/forms'
import { Geolocation } from '@ionic-native/geolocation';
/**
 * Generated class for the LocationsearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var google:any;
@IonicPage()
@Component({
  selector: 'page-locationsearch',
  templateUrl: 'locationsearch.html',
})
export class LocationsearchPage {

  google:any;
  geo:any;
  GoogleAutocomplete:any;
  autocomplete:any;
  autocompleteItems=[];
  completeAddres:any;
  formGroup:FormGroup;
  latitude:any;
  longitude:any;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,private zone: NgZone,
    private geolocation: Geolocation) {

      this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
      this.autocomplete = { input: '' };
      this.autocompleteItems = [];


      this.formGroup=new FormGroup ({
         
        store_location:new FormControl (''),
 
      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LocationsearchPage');
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
