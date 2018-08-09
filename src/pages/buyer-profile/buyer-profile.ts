import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the BuyerProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-buyer-profile',
  templateUrl: 'buyer-profile.html',
})
export class BuyerProfilePage {
  userName:any;
  userEmail:any;
  userPhone:any;
  userAddress:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    console.log(JSON.parse(localStorage.getItem('userDetails')));
    let loginUser=JSON.parse(localStorage.getItem('userDetails'));
    this.userName=loginUser.first_name + loginUser.last_name
    this.userEmail=loginUser.email
    this.userPhone=loginUser.phone
    this.userAddress=loginUser.country+ ","+loginUser.city+","+loginUser.address
    console.log (this.userName)
    console.log (this.userEmail)
    console.log (this.userPhone)
    console.log (this.userAddress)

  }

  ionViewDidLoad() {
     //console.log('ionViewDidLoad BuyerProfilePage');
  }

  editBuyerProfile()
  {
    this.navCtrl.push ('EditBuyerProfilePage')
  }

}
