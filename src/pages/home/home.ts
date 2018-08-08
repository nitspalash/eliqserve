import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {MyApp} from '../../app/app.component';
import {AuthProvider} from '../../providers/auth-service/authservice'
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
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public authProvider:AuthProvider,
    
    public myApp:MyApp) {
      this.myApp.abc();
    
     

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
    this.myApp;


  }



productList(id,name)
  {
    
    //alert(name);
    this.pet= name
    console.log(id)
    this.idSet=
    {
      'cat_id':id
    }

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


}
