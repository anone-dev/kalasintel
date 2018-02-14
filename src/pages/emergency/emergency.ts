import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Component({
  selector: 'page-emergency',
  templateUrl: 'emergency.html'
})
export class EmergencyPage {
  public contacts: Array<object>;
  // private options = { name: "KLNumber.db", location: 'default', createFromLocation: 1 };
  private optionsLo = { name: "KLNumber.db", location: 'default' };
  private queryNames = "SELECT * FROM klnumber WHERE category ='เบอร์โทรศัพท์ฉุกเฉิน'";

  constructor(public navCtrl: NavController, private sqlite: SQLite) {
    // this.sqlite.create(this.options).then((db: SQLiteObject) => {
    //   db.executeSql(this.queryNames, {}).then((data) => {
    //     this.contacts = [];
    //     let rows = data.rows;
    //     for (let i = 0; i < rows.length; i++)
    //       this.contacts.push({id: rows.item(i).runid, fullname: rows.item(i).name,
    //                     phone: rows.item(i).officetel })
    //   })
    // });
  }

  private getItems(ev: any){
    let val = ev.target.value;
    if (val && val.trim() != ''){
      this.contacts = this.contacts.filter((contact: any) => {
        return(contact.fullname.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }else{
      this.showData();
    }
  }

  ionViewWillEnter(){
    this.showData();
  }

  private showData(){
    this.sqlite.create(this.optionsLo).then((db: SQLiteObject) => {
      db.executeSql(this.queryNames, {}).then((data) => {
        this.contacts = [];
        let rows = data.rows;
        for (let i = 0; i < rows.length; i++)
          this.contacts.push({id: rows.item(i).runid, fullname: rows.item(i).name,
                        phone: rows.item(i).officetel })
      })
    });
  }

  private call(contact){
    // alert(contact.name+" "+contact.phone);
    window.open('tel:'+contact.phone);
  }
}
