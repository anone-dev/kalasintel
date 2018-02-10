import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AmperPage } from '../pages/amper/amper';
import { CategoryPage } from '../pages/category/category';
import { EmergencyPage } from '../pages/emergency/emergency';
import { ResultPage } from '../pages/result/result';
import { AboutPage } from '../pages/about/about';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SQLite } from '@ionic-native/sqlite'

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AmperPage,
    CategoryPage,
    EmergencyPage,
    ResultPage,
    AboutPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AmperPage,
    CategoryPage,
    EmergencyPage,
    ResultPage,
    AboutPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SQLite,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}