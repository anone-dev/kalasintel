import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AmperPage } from '../amper/amper';
import { CategoryPage } from '../category/category';
import { EmergencyPage } from '../emergency/emergency';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {
  }
  goToAmper(params){
    if (!params) params = {};
    this.navCtrl.push(AmperPage);
  }goToCategory(params){
    if (!params) params = {};
    this.navCtrl.push(CategoryPage);
  }goToEmergency(params){
    if (!params) params = {};
    this.navCtrl.push(EmergencyPage);
  }
}
