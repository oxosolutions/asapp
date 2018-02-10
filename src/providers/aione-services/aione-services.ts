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
	CreateTable(TableName,Col){
		if(this.db!= undefined){			
			this.query="CREATE TABLE IF NOT EXISTS " +TableName +' ('+Col +')';
			console.log(this.query);
		  this.ExecuteRun(this.query,[]).then((res)=>{
			  console.log(res);
		  });
		}
	}
	TableBulk(TableName,Col){
		if(this.db!= undefined){
			console.log(TableName);		
		  for(let i=0; i<TableName.length;i++){
		  	this.query="CREATE TABLE IF NOT EXISTS " +TableName[i] +' ('+Col[i] +')';
				console.log(this.query);
		 	  this.ExecuteRun(this.query,[]).then((res)=>{
			 	 console.log(res);
		 	  });
		  }				
		}
	}
	Insert(tableName,Cols,Values){
		return new Promise((resolve,reject)=>{
			let questionMarks=[]
			if(this.db!= undefined){
				let questionMarks=[]
				for(let j=0; j< Values.length; j++){
					questionMarks.push("?");
				}
				this.query='insert into '+tableName + '(' + Cols + ') VALUES (' +questionMarks + ')'; 
				//console.log(this.query);
				this.ExecuteRun(this.query, Values).then((insertRes:any)=>{
					resolve(insertRes);
				})
			}
		})
	}
	InsertBulk(tableName,Cols,Values){
		return new Promise ((resolve,reject) =>{
			if(this.db!=undefined){
				let CollectedData=[];
				for(let i=0; i<Values.length; i++){
					let ValuesArray=[];
					for(let j=0; j < Values[i].length; j++){
						ValuesArray.push('"'+Values[i][j]+'"');
					}
					CollectedData.push("("+ValuesArray.join(',') +")");
				}//console.log(CollectedData)
				this.query = 'INSERT INTO '+tableName+' ( '+Cols.join(',')+' ) VALUES '+CollectedData.join(',');
				console.log(this.query);
				this.ExecuteRun(this.query,[]).then((Bulkres:any)=>{ resolve(Bulkres);})
			}
		})
	}
	DeleteAll(tableName){
		return new Promise ((resolve,reject)=>{
			if(this.db!= undefined){
				this.query='Delete  from '+tableName;
				console.log(this.query);
				this.ExecuteRun(this.query,[]).then((Delresult)=>{
					console.log(Delresult);
				})
			}
		})	
	}
	DeleteWhere(tableName, Where, Value){
		return new Promise((resolve,reject)=>{
			if(this.db!= undefined){
				this.query='Delete  from '+tableName+' where '+ Where +' = '+Value;
				console.log(this.query);
				this.ExecuteRun(this.query,[]).then((Delres)=>{
					console.log(Delres);
				})
			}
		})		
	}
	SelectAll(tableName){
		return new Promise ((resolve,reject)=>{
			if(this.db!= undefined){
				this.query='Select * from '+tableName;
				this.ExecuteRun(this.query,[]).then((selectresult:any)=>{
					resolve(selectresult);
				})
			}
		})
		
	}
	SelectWhere(tableName, Where, Value){
		return new Promise ((resolve,reject)=>{
			if(this.db!= undefined){
				this.query='Select * from '+tableName+' where '+ Where +' = '+Value;
				console.log(this.query);
				this.ExecuteRun(this.query,[]).then((SelResult:any)=>{
					resolve(SelResult)
				})	
			}
		});		
	}
	selectAllLimit(tableName,limit){
		return new Promise ((resolve,reject)=>{
			if(this.db!= undefined){
				this.query='Select * From ' +tableName +' LIMIT '+limit;
				console.log(this.query);
				this.ExecuteRun(this.query,[]).then((selLimitResult)=>{
					console.log(selLimitResult);
				})
			}
		})		
	}
	DropTable(tableName){
		if(this.db!= undefined){
			this.query='DROP Table ' + tableName;
			console.log(this.query);
			this.ExecuteRun(this.query,[]).then((DropResult)=>{
				//console.log(DropResult);
			})
		}
	}
	StringReplaceBulk(result){
		return new Promise ((resolve,reject)=>{
			for(let i=0; i< result.length; i++){
				//result[i]=result.item(i);
				let replace=[]
				for(let key in result[i]){
					//console.log(result[i][key]);
					if(typeof(key)!='string'){
						console.log('id');
					}else{
						result[i][key]=result[i][key].replace(/&lt;/g, "<")
                .replace(/&gt;/g, ">")
                .replace(/&quot;/g, '"')
                .replace(/&#039;/g, "'");
					}
					replace.push(result[i][key]);
				}//console.log(replace);
		 	}
		})
	}


}



