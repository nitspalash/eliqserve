import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {MyApp} from '../../app/app.component';
import {AuthProvider} from '../../providers/auth-service/authservice'
import { Geolocation } from '@ionic-native/geolocation';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder';
import {Storage} from '@ionic/storage';
import { Events } from 'ionic-angular';
/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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
 
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public authProvider:AuthProvider,
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,
    public storage: Storage,
    private locationAccuracy: LocationAccuracy,
    public events: Events,
    public myApp:MyApp) {
      this.myApp.abc();
      this.fetchlocation();
      this.myApp.abc();
    this.events.publish('hideFooter',{isHidden:false});
      
    this.authProvider.categoryListing().subscribe((res:any) => {
     

          if (res.Ack==1)
          {
            console.log('my data: ');
            this.categoryArray=res.categories;
            console.log(this.categoryArray[0].name);
            this.pet=this.categoryArray[0].name
            this.productArray=res.catproduct
          console.log(this.productArray)

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
    "user_id":this.userId
  }
} 
else{
  this.idSet=
  {
    'cat_id':id,
    "user_id":''
  }
}

    // this.idSet=
    // {
    //   'cat_id':id
    // }
console.log(this.idSet)
    this.authProvider.listProduct(this.idSet).subscribe(res=>{
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
}
