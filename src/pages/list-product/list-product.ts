import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,LoadingController} from 'ionic-angular';
import {AuthProvider} from '../../providers/auth-service/authservice'
import { Events } from 'ionic-angular';
import {MyApp} from '../../app/app.component';
/**
 * Generated class for the ListProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list-product',
  templateUrl: 'list-product.html',
})
export class ListProductPage {
  loginuser:any;
  userId:any;
  userIdSet:any;
  alcoholList:any;
  imageurl:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
  public alertCtrl:AlertController,
  public authProvider:AuthProvider,
  public events:Events,
  public myApp:MyApp,
  public loadingCtrl: LoadingController) {

    this.loginuser = JSON.parse(localStorage.getItem('userDetails')); 
    this.userId=this.loginuser.id

    this.userIdSet=
    {
      "seller_id":this.userId
    }
    console.log(this.userIdSet)
    let loading = this.loadingCtrl.create({
      content: 'Please Wait...'
    });
    loading.present();
    this.authProvider.prductlisting(this.userIdSet).subscribe(res => {
     
      console.log(res);
      console.log('hello');
      let details = res
      
      if(details.ack == 1){
        loading.dismiss();
        this.alcoholList=details.listalcohol;
        this.imageurl=details.image_link;

        console.log(this.alcoholList)

      } 
      else{

        this.alcoholList='';
        loading.dismiss();

      }
         });
       
         
      
  }

  ionViewDidLoad() {
    this.events.publish('hideFooter', { isHidden: true});
    console.log('ionViewDidLoad ListProductPage');
    this.myApp.abc();
  }

  editList(id)
  {
    this.navCtrl.push ('EditProductPage',{'id':id})
    console.log('hi')


    
  }

  deleteList(id)
  {

    let idSet=
    {
      "prod_id":id
    }
    console.log (idSet)
    let alert = this.alertCtrl.create({
      title: 'Remove Item',
      message: 'Are you sure to remove this item',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
                 
        },
        {
          text: 'Ok',
          handler: () => {
            this.authProvider.deletePrductlisting(idSet).subscribe(res => {
     
              console.log(res);
              console.log('hello');
              let details = res
              
              if(details.ack == 1){
        
        console.log('delete')

        this.authProvider.prductlisting(this.userIdSet).subscribe(res => {
     
          console.log(res);
          console.log('hello');
          let details = res
          
          if(details.ack == 1){
            this.alcoholList=details.listalcohol;
            console.log(this.alcoholList)
    
          }
             });
        
              }
            
                 });
                }
              }
                ]
       
      });
    
      alert.present();
           
                }
        
      
}


