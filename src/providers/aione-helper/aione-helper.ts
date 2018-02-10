//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HomePage } from '../../pages/home/home';
import { ListPage } from '../../pages/list/list';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Calendar } from '@ionic-native/calendar';
@Injectable()
export class AioneHelperProvider {

  constructor(private calender:Calendar) {
    console.log('Hello AioneHelperProvider Provider');
  }
  cal(){
  	console.log('calender clicked');
  	this.calender.createCalendar('MyCalendar').then(
  		(msg) => { console.log(msg); },
  		(err) => { console.log(err); }
		);
  }

}
