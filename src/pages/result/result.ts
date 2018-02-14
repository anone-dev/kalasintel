import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Component({
  selector: 'page-result',
  templateUrl: 'result.html'
})
export class ResultPage {
  public contacts: Array<object>;
  private amper: string;
  private category: string;
  private options = { name: "KLNumber.db", location: 'default' };
  private query: string;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private sqlite: SQLite,
              private toastCtrl: ToastController) {
      this.amper = this.navParams.get('amper');
      this.category = this.navParams.get('category');

      if (this.amper != undefined) {
        this.query = "SELECT * FROM klnumber WHERE amper ='" + this.amper + "'";
      } 
  
      if (this.category != undefined) {
        this.query = "SELECT * FROM klnumber WHERE category ='" + this.category + "'";
      } 
  }

  ionViewWillEnter(){
    this.showData();
  }


  private showData(){
    this.sqlite.create(this.options).then((db: SQLiteObject) => {
      db.executeSql(this.query, {}).then((data) => {
        this.contacts = [];
        let rows = data.rows;
        for (let i = 0; i < rows.length; i++)
          this.contacts.push({id: rows.item(i).runid, fullname: rows.item(i).name,
                        phone: rows.item(i).officetel, position: rows.item(i).position,
                        officename: rows.item(i).officename })
      })
    });

    // let toast = this.toastCtrl.create({
    //   message: 'ค่า amper: '+this.amper + ': ' + this.category,
    //   duration: 3000
    // });
    // toast.present();
  }

  

  private call(contact){
    // alert(contact.name+" "+contact.phone);
    window.open('tel:'+contact.phone);
  }


}
