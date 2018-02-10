//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HomePage } from '../../pages/home/home';
import { ListPage } from '../../pages/list/list';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Injectable()
export class AioneHelperProvider {

  constructor() {
    console.log('Hello AioneHelperProvider Provider');
  }

}
