import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Subscriber } from 'rxjs';
import { FormGroup, FormControl, FormArray, NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ng6-project';
  pageRoleMapping :Object;
  pages   :Object;
  roles   :Object;

  constructor(private httpClient:HttpClient){}

  ngOnInit(){
    this.getPages();
    this.getRoles();  
    this.pageRoleMappings();
  }

  public pageRoleMappings(){
    this.httpClient.get('http://localhost:3000/pageRoleMapping')
    .subscribe(
      res=>{this.pageRoleMapping=res;},
      error=>{console.error("Service related errors",error)},
      ()=>{console.log('completed service pageRoleMapping');}
  );
  }
  public getPages(){
    return this.httpClient.get('http://localhost:3000/pages')
    .subscribe(
      res=>{this.pages=res},
      error=>{console.error('pages service error',error);},
      ()=>{console.log('Complete service pages.');}
    );
  }

  public getRoles(){
    return this.httpClient.get('http://localhost:3000/roles')
    .subscribe(
      res=>{this.roles=res;},
      error=>{console.error('roles service error',error);},
      ()=>{console.log('Complete service roles.');}
    );
  }


  public createPermission(myForm: NgForm){
    //console.log('pages',myForm.value);
    //console.log('pages',this.pages);
    //console.log('roles',this.roles);
    
    let pageRoleMappingArray=[];
    for (let [key, value] of Object.entries(this.roles)) {
      let rolewiseAccess        =[];
      rolewiseAccess['roleId']  =value.roleid;
      rolewiseAccess['pagesIds']=[];
      //console.log("roleid",value.roleid);
            
      for(let [key2,value2] of Object.entries(this.pages)){
          let testaccess =value.roleid+''+value2.pageId;
          if(myForm.value[testaccess]){
            rolewiseAccess['pagesIds'].push(value2.pageId);      
            //console.log(testaccess);
          }
      }
      //console.log('rolewiseAccess',rolewiseAccess);
      pageRoleMappingArray.push(rolewiseAccess);
      }
      //console.log('rolewiseAccess',pageRoleMapping);      
      console.table(pageRoleMappingArray);
       this.pageRoleMapping=pageRoleMappingArray;
    }
  
}
