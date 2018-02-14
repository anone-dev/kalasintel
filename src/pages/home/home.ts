import { SearchPage } from './../search/search';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AmperPage } from '../amper/amper';
import { CategoryPage } from '../category/category';
import { EmergencyPage } from '../emergency/emergency';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public contacts: Array<object>;
  private options = { name: "KLNumber.db", location: 'default', createFromLocation: 1 };
  private queryNames = "SELECT * FROM klnumber ";
  drawerOptions: any;


  constructor(public navCtrl: NavController, private sqlite: SQLite) {
    this.sqlite.create(this.options).then((db: SQLiteObject) => {
      db.executeSql(this.queryNames, {}).then((data) => {
        this.contacts = [];
        let rows = data.rows;
        for (let i = 0; i < rows.length; i++)
          this.contacts.push({id: rows.item(i).runid, fullname: rows.item(i).name,
                        phone: rows.item(i).officetel, position: rows.item(i).position,
                        officename: rows.item(i).officename })
      })
    });

    this.drawerOptions = {
      handleHeight: 50,
      thresholdFromBottom: 100,
      thresholdFromTop: 100,
      bounceBack: true,
      showTitle: "หมายเลขโทรศัพท์ทั้งหมด",
      hideTitle: "กลับหน้าหลัก"
    };
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

  private goSearch(){
    // let val = ev.target.value;
    this.navCtrl.push(SearchPage);
  }

}
