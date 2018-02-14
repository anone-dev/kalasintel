import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { ResultPage } from '../result/result';

@Component({
  selector: 'page-category',
  templateUrl: 'category.html'
})
export class CategoryPage {
  private optionsLo = { name: "KLNumber.db", location: 'default' };
  private queryAmper = "SELECT DISTINCT category FROM klnumber WHERE category <> '' ";
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

  itemSelected(category):void{
    this.navCtrl.push(ResultPage,{
      category
    })
  }

  private showData(){
    this.sqlite.create(this.optionsLo).then((db: SQLiteObject) => {
      db.executeSql(this.queryAmper, {}).then((data) => {
        this.items = [];
        let rows = data.rows;
        for (let i = 0; i < rows.length; i++)
        this.items.push(rows.item(i).category)
      })
    });
  }

  ionViewWillEnter(){
    this.showData();
  }

  ionViewDidLoad() {
    // this.showData();
  }

  
  
}
