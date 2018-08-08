import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import { PopoverController } from 'ionic-angular';

//import { PopoverPage } from '../about-popover/about-popover';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  conferenceDate = '2047-05-17';

  constructor(public navCtrl: NavController, public navParams: NavParams) { }

  presentPopover(event: Event) {
    //let popover = this.popoverCtrl.create(PopoverPage);
    //popover.present({ ev: event });
  }
}
