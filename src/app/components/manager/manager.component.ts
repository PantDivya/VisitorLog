import { Component, OnInit, ViewChild } from '@angular/core';
import { Manager } from 'src/app/Model/managerModel';
import { ApiService } from 'src/app/Service/api.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit{
  manager:Manager= new Manager();
  managerList: any;
  managerRow : Manager = new Manager();
  managerId : number = 0;
  isManagerSelected:boolean=false;
  @ViewChild('closebutton') closebutton:any;



  constructor(private apiService:ApiService){}
    
  ngOnInit(): void{
    this.listManager();
  } 

  addManager(){
    let managerData = this.manager.ManagerForm.value;
   this.apiService.postManager(managerData).subscribe(
    res=>{
      alert("Success");
      this.listManager();
      this.manager.ManagerForm.reset();
      this.closebutton.nativeElement.click();
    },
    err=>{
      alert("Failed");
    }

   );
  }
  
  listManager(){

    this.apiService.getManager().subscribe(
      res=>{
        this.managerList=res;
        console.log(res);
      },
      err=>{
        console.log(err);
      }
    )
  }

  selectedManager(id:number){
    this.isManagerSelected=true;
    this.fetchManagerId(id);
    this.apiService.getManagerById(id).subscribe(
      res=>{
        this.managerRow=res;
       
        this.manager.ManagerForm.controls['Name'].setValue(this.managerRow.Name);
        this.manager.ManagerForm.controls['Contact'].setValue(this.managerRow.Contact);
        this.manager.ManagerForm.controls['Department'].setValue(this.managerRow.Department);
 
    
      },
      err=>{
        console.log(err);
      }
    );
  }

  editManager(){
    let managerRowData = this.manager.ManagerForm.value;
    this.apiService.updateManager(this.managerId, managerRowData).subscribe(
      res=>{
         //this.listManager();
        alert("Updated Successfully.");
        this.manager.ManagerForm.reset();
        this.closebutton.nativeElement.click();
        
      },
      err=>{
        console.log(err);
      }
    );
  }
  fetchManagerId(id:number){
     this.managerId = id;
  }

  removeManager(){
    this.apiService.deleteManager(this.managerId).subscribe(
      res=>{
        this.listManager();
        this.closebutton.nativeElement.click();
      },
      err=>{
        console.log(err);
      }
    );
  }

  resetManagerForm(){
    this.manager=new Manager();
    this.manager.ManagerForm.reset();
  }
}
