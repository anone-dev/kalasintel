import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AmperPage } from '../pages/amper/amper';
import { CategoryPage } from '../pages/category/category';
import { EmergencyPage } from '../pages/emergency/emergency';
import { AboutPage } from '../pages/about/about';


import { HomePage } from '../pages/home/home';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) navCtrl: Nav;
    rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
  goToHome(params){
    if (!params) params = {};
    this.navCtrl.setRoot(HomePage);
  }goToAmper(params){
    if (!params) params = {};
    this.navCtrl.setRoot(AmperPage);
  }goToCategory(params){
    if (!params) params = {};
    this.navCtrl.setRoot(CategoryPage);
  }goToEmergency(params){
    if (!params) params = {};
    this.navCtrl.setRoot(EmergencyPage);
  }goToAbout(params){
    if (!params) params = {};
    this.navCtrl.setRoot(AboutPage);
  }
}
