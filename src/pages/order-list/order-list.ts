import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController} from 'ionic-angular';
import {AuthProvider} from '../../providers/auth-service/authservice';
// import { AppRate } from '@ionic-native/app-rate';
import { Ionic2RatingModule } from 'ionic2-rating';
import { Events } from 'ionic-angular';
import { CssSelector } from '@angular/compiler';
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
  className: string = 'alertstar';
  constructor(public navCtrl: NavController, public navParams: NavParams,
  public authProvider:AuthProvider,
  public alertCtrl: AlertController,
  public events:Events
) {

  console.log('rate',this.rate)
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

//   review()
//   {
//   const alert = this.alertCtrl.create({
//     title: 'Rate your speech:',

//     cssClass:this.className,
//     enableBackdropDismiss:true,

//     inputs:[
//       {
//         name:'comment',
//         placeholder:'Comments'
//       }
//           ],


//     buttons: [
//          { text: '1',
//          handler: (data) => { 
//           this.rating(1,data.comment)
//          return false;
//          }
//         },
         
//          { text: '2',
//          handler: (data) => { 
//           this.rating(2,data.comment)
//           return false;
//           }},
//          { text: '3',
//          handler: (data) => { 
//           this.rating(3,data.comment)
//           return false;
//           }},

//          { text: '4',
//          handler: (data) => { 
//           this.rating(4,data.comment)
//           return false;
//           }},
//          { text: '5',
//          handler: (data) => { 
//           this.rating(5,data.comment)
//           return false;
//           }},

//         {
//                   text: 'Submit',
//                   handler: (data) => {
//                     this.rating(data,data.comment);
//                       console.log('logged in!')
//                       console.log(data.comment)
//                       console.log(data)
//                       this.onclick();
//                       // console.log(data.comment)
                      
                   
//                   },cssClass:'btnsubmit'
//                 }
        
//     ]
// });
// alert.present();


  
 
//   }

//   onclick()
//   {
//     console.log('hi')
//     this.className = 'another-class'
//   }

//   rating(i,data)
//   {
// console.log(i)
// console.log(data)

//   }

  ionViewDidLoad() {
    this.events.publish('hideFooter', { isHidden: false});
    console.log('ionViewDidLoad OrderListPage');
  }

  goToOrderDetails(id)
  {
    this.navCtrl.push('OrderDetailPage',{param:id})
    console.log('rate',this.rate)
  }

  goToCartPage()
  {
    this.navCtrl.push('CartPage')
    console.log('cart')
  }


//   alert()
// {
//   let alert = this.alertCtrl.create({
//     title: 'Login',
//     inputs: [
     
//       {
//         name:'comment',
//         placeholder:'Comments',
//         type:'string'
//       },
     
//       {
//         name: 'radio',
//         placeholder: 'good',
//         type:'radio',
//         value:'1'
//       },
//       {
//         name: 'radio',
//         label: 'very good',
//         type:'radio',
//         value:'2'
//       },

//       {
//         name: 'radio',
//         placeholder: 'excellent',
//         type:'radio',
//         value:'3'
//       },


//     ],
//     buttons: [

           
//       {
//         text: 'Cancel',
//         role: 'cancel',
//         handler: data => {
//           console.log('Cancel clicked');
//         }
//       },
//       {
//         text: 'Submit',
//         handler: (data:string) => {
         
//             console.log('logged in!')
//             console.log(data)
//             // console.log(data.comment)
            
         
//         }
//       }
//     ]
//   });
//   alert.present();
// }
}
