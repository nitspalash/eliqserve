import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Events} from 'ionic-angular'

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  userName:any;
  userEmail:any;
  userPhone:any;
  userAddress:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
  public events:Events,) {


    console.log(JSON.parse(localStorage.getItem('userDetails')));
    let loginUser=JSON.parse(localStorage.getItem('userDetails'));
    this.userName=loginUser.first_name + loginUser.last_name
    this.userEmail=loginUser.email
    this.userPhone=loginUser.phone
    // if (loginUser.country!=null)
    // {
    //   this.userAddress=loginUser.country+ ","+loginUser.city+","+loginUser.address
    // }
    // else{
    //   this.userAddress==""
    // }
    
    console.log (this.userName)
    console.log (this.userEmail)
    console.log (this.userPhone)
    console.log (this.userAddress)

  }

  editSellerProfile ()
  {
   
    this.navCtrl.push ('EditProfilePage');
  }
  goTochnagepassword()
  {
    this.navCtrl.push ('ChangePasswordPage');  
  }

  ionViewDidLoad() {
    this.events.publish('hideFooter', { isHidden: true});
    console.log('ionViewDidLoad ProfilePage');
  }

}
