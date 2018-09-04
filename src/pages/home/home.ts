import { Component,NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {MyApp} from '../../app/app.component';
import {AuthProvider} from '../../providers/auth-service/authservice'
import { Geolocation } from '@ionic-native/geolocation';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder';
import {Storage} from '@ionic/storage';
import { Events } from 'ionic-angular';
import {FormGroup,FormControl} from '@angular/forms'
import { AlertController } from 'ionic-angular/components/alert/alert-controller';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var google:any;
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  pet:string
  categoryArray: any;
  productArray:any;
  idSet:any;
  prodSet:any;
  imageLink:any;
  catproductArray:any;
  public currentaddress:any;
  public address:any;
  country:any;
  loginuser:any;
  userId:any;
  lat:any;
  lng:any;
 //spandan

 google:any;
  geo:any;
  GoogleAutocomplete:any;
  autocomplete:any;
  autocompleteItems=[];
  completeAddres:any;
  formGroup:FormGroup;
  latitude:any;
  longitude:any;
  message:any;
  textlocation: boolean=false;
  catid:any;


  constructor(public navCtrl: NavController, public navParams: NavParams,
    public authProvider:AuthProvider,
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,
    public storage: Storage,
    private locationAccuracy: LocationAccuracy,
    public events: Events,
    public myApp:MyApp,
    private zone: NgZone,
    public alertCtrl:AlertController) {


      this.myApp.abc();
      this.fetchlocation();
      this.myApp.abc();
      this.events.publish('hideFooter',{isHidden:false});
      
      this.catlist();

    //   this.lat= JSON.parse(localStorage.getItem('lat'));
    // this.lng= JSON.parse(localStorage.getItem('lng'));
     
      //spandan

      this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
      this.autocomplete = { input: '' };
      this.autocompleteItems = [];
      this.formGroup=new FormGroup ({
        store_location:new FormControl (''),
      })


  }


catlist(){

  this.authProvider.categoryListing().subscribe((res:any) => {
     

    if (res.Ack==1)
    {
      console.log('my data: ');
      this.categoryArray=res.categories;
      console.log(this.categoryArray[0].name);
      this.catid=this.categoryArray[0].id
      this.pet=this.categoryArray[0].name
      this.productArray=res.catproduct
    console.log('catis',this.catid)

    this.imageLink=res.categoryimagepath
    console.log (this.imageLink) 
    }
});
}



  ionViewDidLoad() {
    
    console.log('ionViewDidLoad HomePage');
   
    
    this.address = JSON.parse(localStorage.getItem('currentaddress'));
    if(this.address)
    this.country = this.address.countryName;
    //alert(this.country)

    //this.message="<form [formGroup]='formGroup'><ion-item><ion-input type='text' placeholder='Type location' formControlName='store_location' name='store_location' (keyup)='updateSearchResults()'></ion-input></ion-item><ion-list [hidden]='autocompleteItems.length == 0'><ion-item *ngFor='let item of autocompleteItems' tappable (click)='selectSearchResult(item)'>item.description</ion-item></ion-list></form>";

    

  }

  fetchlocation(){

    
    this.geolocation.getCurrentPosition().then((resp) => {
       
  
      let options: NativeGeocoderOptions = {
        useLocale: true,
        maxResults: 5
    };
    
    this.nativeGeocoder.reverseGeocode(resp.coords.latitude, resp.coords.longitude, options)
      .then((result: NativeGeocoderReverseResult[]) => {
       // console.log(JSON.stringify(result[0]))
        this.storage.ready().then(() => {
          
          localStorage.setItem('currentlatlong', JSON.stringify(resp.coords));
          localStorage.setItem('lat', JSON.stringify(resp.coords.latitude));
          localStorage.setItem('lng', JSON.stringify(resp.coords.longitude));
          localStorage.setItem('currentaddress', JSON.stringify(result[0]));
          var address = JSON.stringify(result[0])
          //this.currentaddress = ;
          this.address = JSON.parse(localStorage.getItem('currentaddress'));
          console.log('lat',JSON.parse(localStorage.getItem('lat')))
          console.log('lng',JSON.parse(localStorage.getItem('lng')))
        
          console.log(address)
          
          console.log(this.currentaddress);
          this.productList(this.catid,this.pet);
        if(this.address.thoroughfare)
        {
          this.currentaddress = this.address.thoroughfare +',';
        }
        if(this.address.subLocality)
        {
          this.currentaddress = this.currentaddress + this.address.subLocality +',';
        }
        if(this.address.locality)
        {
          this.currentaddress = this.currentaddress+ this.address.locality +',';
        }
        if(this.address.subAdministrativeArea)
        {
          this.currentaddress = this.currentaddress + this.address.subAdministrativeArea +',';
        }
        if(this.address.administrativeArea)
        {
          this.currentaddress = this.currentaddress + this.address.administrativeArea +',';
        }
        if(this.address.countryName)
        {
          this.currentaddress = this.currentaddress + this.address.countryName +',';
        }
        if(this.address.postalCode)
        {
          this.currentaddress = this.currentaddress + this.address.postalCode;
        }
          
          console.log(address);
  
      })
      })
      .catch((error: any) => console.log(error));
  
  
      console.log(resp)
      // resp.coords.latitude
      // resp.coords.longitude
     }).catch((error) => {
       console.log('Error getting location', error);
     });
     
  }

productList(id,name)
  {
    console.log('product')
    //alert(name);
    this.pet= name
    console.log(id)

    

if (localStorage.getItem('userDetails'))
{
  this.loginuser = JSON.parse(localStorage.getItem('userDetails')); 
  this.userId=this.loginuser.id


  this.idSet=
  {
    'cat_id':id,
    "user_id":this.userId,
  "latitude":JSON.parse(localStorage.getItem('lat')),
  "longitude":JSON.parse(localStorage.getItem('lng'))
   
  }
} 
else{
  this.idSet=
  {
    'cat_id':id,
    "user_id":'',
    "latitude":JSON.parse(localStorage.getItem('lat')),
    "longitude":JSON.parse(localStorage.getItem('lng'))
  }
}

    // this.idSet=
    // {
    //   'cat_id':id
    // }
console.log(this.idSet)
    this.authProvider.listProduct(this.idSet).subscribe(res=>{
      console.log('product list')
      console.log(res);
     
      let details = res
      if(details.Ack == 1){
        console.log('hello')
        
      this.productArray=details.products
      console.log (this.productArray);
      this.imageLink=res.image_link
      console.log (this.imageLink) 

      } 
    
  });
}
goToProductDetails(data)
{
  console.log("product details")
  console.log(data)

this.navCtrl.push('SearchResultDetailsPage',{param:data})



}

locationsearch(){

  this.navCtrl.push('LocationsearchPage');
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
          //console.log('prediction',prediction)
          //console.log(predictions)
          this.autocompleteItems.push(prediction);
        });
      });
    });
   
}

selectSearchResult(item) {
  this.autocompleteItems = [];
  
  console.log('item',item)
  this.completeAddres = item.description;
  //console.log('address',this.completeAddres);
  this.textlocation= false;
  this.currentaddress=this.completeAddres;
  this.formGroup.get('store_location').setValue('');


  this.geo = item;
  //console.log(this.geo);
  this.geoCode(this.geo);
  //this.catlist();
  
}

geoCode(address:any) {
  let geocoder = new google.maps.Geocoder();
  geocoder.geocode({ 'address': this.completeAddres }, (results, status) => {
    //console.log('spresutl',JSON.stringify(results[0]));
  this.latitude = results[0].geometry.location.lat();
  this.longitude = results[0].geometry.location.lng();
  localStorage.setItem('lat', this.latitude);
  localStorage.setItem('lng', this.longitude);
  this.productList(this.catid,this.pet); 
  //debugger;
  //console.log("lat: " + this.latitude + ", long: " + this.longitude);
 });
}

showtypelocation(){

  this.textlocation= true
}
}
