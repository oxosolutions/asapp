import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AioneServicesProvider } from '../../providers/aione-services/aione-services';
import { AioneHelperProvider } from '../../providers/aione-helper/aione-helper';
import { LoadingController } from 'ionic-angular';
@IonicPage()
@Component({
  selector: 'page-synchronize-record',
  templateUrl: 'synchronize-record.html',
})
export class SynchronizeRecordPage {
	collectionSurvey:any;
	synchronizeData:any=[];
	listSurvey:any;
	 loader:any;
	 latitude:any;
  longitude:any;
  zoom:any;
  appVersion:any;
  constructor(private loaderCtrl:LoadingController,public servicesProvider:AioneServicesProvider,public AioneHelp:AioneHelperProvider,public navCtrl: NavController, public navParams: NavParams) {
  }
  ionViewDidLoad(){
  	this.checkSurvey().then((selected:any)=>{
  		if(selected.length >0){
  			this.listSurvey=selected;
  			console.log(this.listSurvey)
  		}else{
  			console.log('no surveys');
  		}

  	})	
  }
  checkSurvey(){
  	return new Promise((resolve,reject)=>{
  		let forloop=0;
	    this.servicesProvider.SelectAll("surveys").then((surveyId:any)=>{
	    	this.servicesProvider.mobileListArray(surveyId).then((list:any)=>{
	    		this.collectionSurvey = list;
	    	// 	list.forEach((key,value)=>{
	    	// 		let tablename='surveyResult_'+key.id;
	    	// 		let query1="SELECT * FROM "+tablename +" WHERE survey_sync_status IS NULL AND survey_status ='completed'";
	     //  		this.servicesProvider.ExecuteRun(query1,[]).then((result:any)=>{
	     //  			this.servicesProvider.mobileListArray(result).then((collection:any)=>{
	     //  				forloop++;

		    //   			if(!(collection[0] == 'undefined')){
		    //   				this.AddTableName(collection[0],tablename).then((newCollection:any)=>{
			   //    				this.synchronizeData.push(newCollection);
			   //    				if(forloop == list.length){
			   //    					this.synchronizeData=this.synchronizeData.filter((Element,index)=>{
			   //    						return(Element != undefined);
			   //    					});
			   //    					resolve(this.synchronizeData);
			   //    				}
			   //    			});
		    //   			}
	     //  			});
	      			
	     //  		});

	    	// 	});
	    })
	    	
	    })
  	})	
  }
  AddTableName(collection,tablename){
  	return new Promise((resolve,reject)=>{
  		if(collection == undefined){
  			console.log("undefined");
  			resolve(collection);
  		}else{
  			collection["tablename"]=tablename;
  
	  		resolve(collection);
  		}
  	})
  }

  

  onSubmit(formData,tablename){
  	console.log(formData);
    console.log(tablename);
    //   this.loader = this.loaderCtrl.create({
    //   spinner: 'crescent',
    //   content: `
    //   <div class="custom-spinner-container">
    //     <div class="custom-spinner-box">`+'Refreshing data'+`</div>
    //   </div>`,
    // });

    // this.loader.present(); 
    
    if((!formData.valid)){
      console.log("not valid"); 
      // this.loader.dismiss(); 
    }else{
     console.log(formData.value);
    //   console.log('further');
    //   let formValue = [];
    //   let json:any;
    //   let forloop=0;
    //   for(let key in formData.value){
    //     if(formData.value[key] == true){
    //     	let tablename="surveyResult_"+this.navParams.get('id');
    //       this.servicesProvider.SelectWhere(tablename,"serialNo",key).then((result:any)=>{
    //         formValue.push(result.rows.item(0));
    //         forloop++;
    //         if(forloop == Object.keys(formData.value).length){
    //           console.log(formValue);
    //            //this.dataSend(formValue).then(()=>{
    //              // this.loader.dismiss();
    //              this.checkSurvey().then(()=>{
    //                this.AioneHelp.presentToast('Synchronized data successfully',1200,'top');
    //              })
                 
    //          //})
    //         }
    //     })
      
    //   }else{
    //     forloop++;
    //   }
    //   //if user nothing selected and just clicked
    //    if(formData.value[key] == undefined){
    //      if(forloop == Object.keys(formData.value).length){
    //            this.loader.dismiss();
    //            this.AioneHelp.showAlert('Error','To Synchronize data, you must check survey')
    //       }
          
    //     }
    // }
  }
}

	

  // dataSend(formValue){
  //   return new Promise((resolve,reject)=>{
  //     let tablename="surveyResult_"+this.navParams.get('id');
  //      var formData = new FormData;
  //           formData.append('survey_data',JSON.stringify(formValue));
  //           formData.append('survey_id',this.navParams.get('id'));
  //           formData.append('activation_code', '292608');
  //           formData.append('lat_long',JSON.stringify({lat: this.latitude, long: this.longitude}));
  //           try{
  //             this.AioneHelp.deviceInfo().then((info:any)=>{
  //               formData.append('app_version',info);
  //             });
  //           }catch(e){
  //             formData.append('app_version','Unable to get app version');
  //           }
  //           console.log(formData)
  //           this.http.post("http://iris.scolm.com/api/survey_filled_data", formData)
  //             .subscribe(data => {
  //               console.log(data);
  //               for(let i=0; i< formValue.length ; i++){
  //                 // serialNo
  //                 console.log(formValue[i]);
  //                 console.log(formValue[i].serialNo);
  //                 let query='Update '+ tablename + ' SET survey_sync_status = "synchronized" where serialNo = "'+ formValue[i].serialNo +'"';
  //                 console.log(query);
  //                 this.servicesProvider.ExecuteRun(query,[]).then((update:any)=>{
  //                   console.log(update);
  //                  resolve(update);
  //                  })
  //               }
                 

  //             },error=>{
  //               this.loader.dismiss();
  //               console.log(error);
  //             });
  //   })
    
  // }
}
