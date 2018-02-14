import { ResultPage } from './../result/result';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Component({
  selector: 'page-amper',
  templateUrl: 'amper.html'
})
export class AmperPage {
  private optionsLo = { name: "KLNumber.db", location: 'default' };
  private queryAmper = "SELECT DISTINCT amper FROM klnumber WHERE amper <> '' ";
  private items: string[]=[];

  constructor(public navCtrl: NavController, private sqlite: SQLite) {

  }

  private getItems(ev: any){
    let val = ev.target.value;
    if (val && val.trim() != ''){
      this.items = this.items.filter((item) => {
        return(item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }else{
      this.showData();
    }
  }

  itemSelected(amper):void{
    this.navCtrl.push(ResultPage,{
      amper
    })
  }

  private showData(){
    this.sqlite.create(this.optionsLo).then((db: SQLiteObject) => {
      db.executeSql(this.queryAmper, {}).then((data) => {
        this.items = [];
        let rows = data.rows;
        for (let i = 0; i < rows.length; i++)
        this.items.push(rows.item(i).amper)
      })
    });
  }

  ionViewWillEnter(){
    this.showData();
  }
  
}
