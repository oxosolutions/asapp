import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http';
import { Nav, Platform ,ToastController} from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { HomePage } from '../../pages/home/home';


@Injectable()
export class AioneServicesProvider {
	public database:any;
	public query:any;
	db:any;
	Apidata:any;
	slugs = [];
	dataset:any;
	AppkitProducts=[];

	constructor(public http: HTTP, public platform:Platform, public sqlite:SQLite) {
		console.log('Hello AioneServicesProvider Provider');
	}

	PlatfromCheck(databaseName){
		if(this.platform.is('cordova')){
			this.sqlite.create({name: databaseName, location:'default'}).then(( data: SQLiteObject) => { 
			  this.db=data;
			  console.log(this.db);
			});
		}else{
			this.db= (<any> window).openDatabase(databaseName, '1', 'my', 1024 * 1024 * 100); 
			console.log(this.db);  
		}
	}
	ExecuteRun(query,DataValue){
		return new Promise( (resolve,reject)=>{
			if(this.query!= undefined && this.db!= undefined){
				if(this.platform.is('cordova')){
					this.db.executeSql(query,DataValue,(executeResult:any)=>{
						resolve(executeResult);
					},(error:any)=>{ console.log(error);
					})
				}else{
					this.db.transaction((tx)=>{
						tx.executeSql(query,DataValue,(tx,executeResult:any)=>{
							resolve(executeResult);
						},(error:any)=>{
							console.log(this.query);
							console.log(error);
						})
					});
				}
			}
		})		
	}
	LoadApi(ApiLink){
		// this.http.get("http://master.scolm.com/api/dataset/123456/3s1clNJqHOXhFbir1NFlpsx9s")
		// .subscribe((data)=>{
       
  //   })
    
	}
	CreateTable(TableName,Col){
		let columns=[];
		let result:any;
		if(this.db!= undefined){
			// for(let Appkey in Col){
			// 	console.log(Col[Appkey] + ' TEXT');
			// 	columns.push([Appkey] + ' TEXT');
			// }console.log(columns);
			this.query="CREATE TABLE IF NOT EXISTS " +TableName +' ('+Col +')';
			//console.log(this.query);
		  this.ExecuteRun(this.query,[]).then((res)=>{
			 // console.log(res);
		  });
		}
	}
	Insert(tableName,Cols,Values){
		let questionMarks=[]
		if(this.db!= undefined){
		this.query='select * from '+tableName;
		this.ExecuteRun(this.query,[]).then((insertRes:any)=>{
			//console.log(insertRes);
			if(insertRes.rows.length>0){
				//console.log('update');
				this.query='Delete from '+tableName;
				this.ExecuteRun(this.query,[]).then((Delresult)=>{
					this.InsertSingle(Values,tableName,Cols).then((updateinsert)=>{
						//console.log(updateinsert);
					})
				})
			}else{
				//console.log('insert');
				this.InsertSingle(Values,tableName,Cols).then((insert)=>{
					//console.log(insert);
				})
			}
		})

		}
	}
	InsertSingle(Values,tableName,Cols){
		return new Promise((resolve,reject)=>{
			let questionMarks=[]
			for(let j=0; j< Values.length; j++){
					questionMarks.push("?");
			}
			//console.log(questionMarks);
			this.query='insert into '+tableName + '(' + Cols + ') VALUES (' +questionMarks + ')'; 
			//console.log(this.query);
			this.ExecuteRun(this.query, Values).then((hh:any)=>{
				resolve(hh);
			})
		})
		
	}
	InsertBulk(tableName,Cols,Values){
		if(this.db!=undefined){
			console.log(Cols);
			console.log(Values);
			this.query='select * from '+tableName;
			this.ExecuteRun(this.query,[]).then((result:any)=>{
				if(result.rows.length> 0){
					console.log('update');
					this.query='Delect from '+ tableName;
					this.ExecuteRun(this.query,[]).then((dfd)=>{
						this.bulkinsert(tableName,Cols,Values).then((bulkUpdate:any)=>{
							console.log(bulkUpdate);
						});		
					})
				}else{
					console.log('insert');
					this.bulkinsert(tableName,Cols,Values).then((bulkInsert:any)=>{
						console.log(bulkInsert);
					});
				}
			})
		}
	}
	bulkinsert(tableName,Cols,Values){
		return new Promise((resolve,reject)=>{
			if(Values!= undefined){
				let CollectedData=[];
				for(let i=0; i<Values.length; i++){
					let ValuesArray=[];
					for(let j=0; j < Values[i].length; j++){
						console.log(Values[i].length);
						//ValuesArray.push(j)
					}
					// for(let j=0; j)
				}
			}
		})
	}
	Update(tableName){
		if(this.db!=undefined){

		}
	}
	DeleteAll(tableName){
		if(this.db!= undefined){
			this.query='Delete * from '+tableName;
			console.log(this.query);
			this.ExecuteRun(this.query,[]).then((Delresult)=>{
				//console.log(Delresult);
			})
		}
	}
	DeleteWhere(tableName,id){
		if(this.db!= undefined){
			this.query='Delete * from '+tableName+' where id = '+id;
			this.ExecuteRun(this.query,[]).then((Delres)=>{
				//console.log(Delres);
			})
		}
	}
	SelectAll(tableName){
		if(this.db!= undefined){
			this.query='Select * from '+tableName;
			this.ExecuteRun(this.query,[]).then((selectresult)=>{
				console.log(selectresult);
			})
		}
	}
	SelectWhere(tableName,id){
		if(this.db!= undefined){
			this.query='Select * from '+tableName+' Where id '+id;
			this.ExecuteRun(this.query,[]).then((SelResult)=>{
				console.log(SelResult)
			})
		}
	}
	selectAllLimit(tableName,limit){
		if(this.db!= undefined){
			this.query='Select * From ' +tableName +'LIMIT '+limit;
			this.ExecuteRun(this.query,[]).then((selLimitResult)=>{
				console.log(selLimitResult);
			})
		}
	}
	DropTable(tableName){
		console.log("dflkdfjdkl");
		if(this.db!= undefined){
			this.query='DROP Table ' + tableName;
			console.log(this.query);
			this.ExecuteRun(this.query,[]).then((DropResult)=>{
				console.log(DropResult);
			})
		}
	}
	StringReplace(Result){
		// for(i=)
	}


}




