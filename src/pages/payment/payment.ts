import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Braintree, PaymentUIOptions,PaymentUIResult } from '@ionic-native/braintree';
/**
 * Generated class for the PaymentPage page.
 *
 * Ionic pages and navigation.
 */
const BRAINTREE_TOKEN = 'sandbox_c763pzf4_3rpbrc5n25v99mrt';
@IonicPage()
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})



export class PaymentPage {

  
  
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private braintree: Braintree) {


      


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentPage');
  }

  paymentSucess()
  {
    this.navCtrl.push('PaymentSuccessfulPage')
  }


  payment(){

    const paymentOptions: PaymentUIOptions = {
      amount: '14.99',
      primaryDescription: 'Your product or service (per /item, /month, /week, etc)',
    };
    
    this.braintree.initialize(BRAINTREE_TOKEN)
    .then(() => this.braintree.presentDropInPaymentUI(paymentOptions))
      .then((result: PaymentUIResult) => {
        if (result.userCancelled) {
          console.log("User cancelled payment dialog.");
        } else {
          console.log("User successfully completed payment!");
          console.log("Payment Nonce: " + result.nonce);
          console.log("Payment Result.", result);
        }
      })
      .catch((error: string) => console.error(error));

     
      
  }

  
}
