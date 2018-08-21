import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController} from 'ionic-angular';
import {AuthProvider} from '../../providers/auth-service/authservice';
// import { AppRate } from '@ionic-native/app-rate';
//import { Ionic2RatingModule } from 'ionic2-rating';
import { Events } from 'ionic-angular';
import { CssSelector } from '@angular/compiler';
import { Title } from '@angular/platform-browser/src/browser/title';
import { debounce } from 'ionic-angular/util/util';
/**
 * Generated class for the OrderListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order-list',
  templateUrl: 'order-list.html',
})
export class OrderListPage {
  loginuser:any;
  userId:any;
  userIdSet:any;
  orderArray:any;
  rate:any;
  idSet:any;
  productId:any;
  disableBtn:boolean=false;
  //className: string = 'alertstar';
  className:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
  public authProvider:AuthProvider,
  public alertCtrl: AlertController,
  public events:Events
) {

  // console.log('rate',this.rate)
    console.log('hello');
    this.loginuser = JSON.parse(localStorage.getItem('userDetails')); 
    this.userId=this.loginuser.id

    this.userIdSet=
    {
      "user_id":this.userId
    }

    this.authProvider.orderlist(this.userIdSet).subscribe(res => {
     
      console.log(res);
      
      let details = res
      
      if(details.Ack == 1){
        console.log("order list")
        this.orderArray=details.orderlist
        console.log(this.orderArray)
  }
})
  }

  review(data){
 let prompt = this.alertCtrl.create({
  title: 'Rate Venue',
  inputs: [{
      name: 'review',
      placeholder: 'Review'
    },
  ],
  buttons: [
    {
      text:`<rating [(ngModel)]= 'rate'         
       readOnly = 'false'        
       max = 5        
       emptyStarIconName =star-outline       
       halfStarIconName = star-half       
       starIconName = star        
       nullable = false       
      (ngModelChange) = onModelChange($event)>
      </rating>`,

    },
    {
      text: 'Cancel',
      handler: data => {
        console.log('Cancel clicked');
      }
    },
    {
      text: 'Save',
      handler: data => {
        console.log('Saved clicked');
      }
    }
  ]
});
prompt.present();
    const alert = this.alertCtrl.create({
      title: 'Rate your speech:',
      //subTitle: bleu,
      cssClass: 'alertstar',
      enableBackdropDismiss:false,
      buttons: [
           { text: '1', handler: data => { this.resolveRec(1);}},
           { text: '2', handler: data => { this.resolveRec(2);}},
           { text: '3', handler: data => { this.resolveRec(3);}},
           { text: '4', handler: data => { this.resolveRec(4);}},
           { text: '5', handler: data => { this.resolveRec(5);}}
      ]
 });
 alert.present();
  }

  resolveRec(data){

  }

  // review(prod_id)
  // {
  //   console.log(this.productId);
  //   console.log(prod_id);

    // if (this.productId==prod_id)
    // {

    //   const alert = this.alertCtrl.create({
    //     title: 'You have already submitted rating on this product',
    //        buttons: ['ok']
    //   });
    //   alert.present();

    // }
// else{
//     this.productId=prod_id;
//   const alert = this.alertCtrl.create({
//     title: 'Rate your product:',

//     cssClass:this.className,
//     enableBackdropDismiss:true,

//     inputs:[
//       {
//         name:'comment',
//         placeholder:'Write your comments',
        
        
//       }
//           ],


//     buttons: [
//          { text: '1',
//          handler: (data) => { 
//           this.rating(1,data.comment)
//           this.onclickone()
//          return false;
//          },
//         },
         
//          { text: '2',
//          handler: (data) => { 
//           this.rating(2,data.comment)
//           this.onclicktwo()
          
//           return false;
//           }},
//          { text: '3',
//          handler: (data) => { 
//           this.rating(3,data.comment)
//           this.onclickthree()
        
//           return false;
//           }},

//          { text: '4',
//          handler: (data) => { 
//           this.rating(4,data.comment)
//           this.onclickfour()
//           return false;
//           }},
//          { text: '5',
//          handler: (data) => { 
//           this.rating(5,data.comment)
//           this.onclickfive()
          
//           return false;
//           }},

//         {
//                   text: 'Submit',
//                   handler: (data) => {

//                     if (!data.comment)
//                     {
//                       console.log('false')
//                       return false;
                      
//                     }else
//                     {
                    
//                       console.log('logged in!')
//                       // console.log(data.comment)
//                       console.log('idset',this.idSet);

//                       this.authProvider.productRating(this.idSet).subscribe(res => {
     
//                         console.log(res);
                        
//                         let details = res
//                         console.log("review")
//                         // this.disableBtn=!this.disableBtn;
//                         if(details.Ack == 1){
//                           this.rate=details.rating;
//                           this.className='alertstar';
//                           console.log(this.rate);
//                     //    
//                     }
//                   })
                     
//                     }
                   
//                   },cssClass:'btnsubmit'
//                 }
        
//     ]
// });
// alert.present();
// }


  
 
  // }

  // onclickone()
  // {
  //   console.log('one')
  //   this.className = 'another-classone'
  // }


  // onclicktwo()
  // {
  //   console.log('two')
  //   this.className = 'another-classtwo'
  // }

  // onclickthree()
  // {
  //   console.log('three')
  //   this.className = 'another-classthree'
  // }

  // onclickfour()
  // {
  //   console.log('four')
  //   this.className = 'another-classfour'
  // }
  // onclickfive()
  // {
  //   console.log('five')
  //   this.className = 'another-classfive'
  // }
  // onclick()
  // {
  //   console.log('hi')
  //   this.className = 'another-class'
  // }

//   rating(rating,comment)
//   {
// console.log(rating)
// console.log(comment)

// this.idSet={
// "user_id":this.userId,
// "prod_id":this.productId,
// "rating":rating,
// "review":comment,
// }

// console.log(this.idSet);
//   }

  ionViewDidLoad() {
    this.events.publish('hideFooter', { isHidden: false});
    console.log('ionViewDidLoad OrderListPage');
  }

  goToOrderDetails(id)
  {
    this.navCtrl.push('OrderDetailPage',{param:id})
    // console.log('rate',this.rate)
    
  }

  goToCartPage()
  {
    this.navCtrl.push('CartPage')
    console.log('cart')
  }

  


}
