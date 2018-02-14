import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Searchbar } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  public contacts: Array<any>;
  private options = { name: "KLNumber.db", location: 'default' };
  private query= "SELECT * FROM klnumber";
  @ViewChild('searchBar') searchInput: Searchbar;
  // private val: string;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private sqlite: SQLite) {
      // this.val = this.navParams.get('val');
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad SearchPage');
    // this.showData();
  }

  ionViewWillEnter(){
    this.showData();
    // this.searchInput.setFocus();
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

  private getItems(ev: any){
    let vali = ev.target.value;
    if (vali && vali.trim() != ''){
      this.contacts = this.contacts.filter((item) => {
        return(item.fullname.toLowerCase().indexOf(vali.toLowerCase()) > -1) 
        || (item.position.toLowerCase().indexOf(vali.toLowerCase()) > -1) 
        || (item.officename.toLowerCase().indexOf(vali.toLowerCase()) > -1) ;
      })
    }else{
      this.showData();
    }
  }

  private call(contact){
    // alert(contact.name+" "+contact.phone);
    window.open('tel:'+contact.phone);
  }
}
