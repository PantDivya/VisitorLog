import { Component, OnInit, ViewChild } from '@angular/core';
import { Visitor } from 'src/app/Model/visitorModel';
import { ApiService } from 'src/app/Service/api.service';

@Component({
  selector: 'app-visitors',
  templateUrl: './visitors.component.html',
  styleUrls: ['./visitors.component.css']
})
export class VisitorsComponent implements OnInit{
  visitor:Visitor = new Visitor();
  managerList:any;
  managerId: any;
  visitorId: number = 0;
  visitorList: any;
  visitorRow: Visitor = new Visitor();
  isVisitorSelected:boolean=false;
  
  
  @ViewChild('closebutton') closebutton:any;

  constructor(private _service:ApiService) {}
  

  ngOnInit(): void {
    this.listVisitor();
    this.listManager();
  }
  listVisitor() {
    this._service.getVisitors().subscribe(
      res=>{
        this.visitorList = res;
        console.log(this.visitorList);
      },
      err=>{
        console.log(err);
      }
    );
  }

  addVisitor(){
    let visitorData = this.visitor.VisitorForm.value;
    this._service.postVisitor(visitorData).subscribe(
      res=>{
        this.listVisitor();
        this.visitor.VisitorForm.reset();
        alert("Visitor added successfully");
        
        this.closebutton.nativeElement.click();
      },
      err=>{
        console.log(err);
      }
    );
  }


  listManager(){
    this._service.getManager().subscribe(
      res=>{
        this.managerList = res;
        console.log(this.managerList);
      },
      err=>{
        console.log(err);
      }
    );
  }

  onManagerChange(event:any){
    this.managerId = event.target.value;
  }

  selectedVisitor(id:number){
    this.isVisitorSelected = true;
    this.fetchVisitorId(id);
    this._service.getVisitorById(id).subscribe(
      res=>{
       this.visitorRow=res;
       this.managerId=res.Manager.ManagerId;
       
       this.visitor.VisitorForm.controls['Name'].setValue(this.visitorRow.Name);
       this.visitor.VisitorForm.controls['Purpose'].setValue(this.visitorRow.Purpose);
       this.visitor.VisitorForm.controls['TimeIn'].setValue(this.visitorRow.TimeIn);
       this.visitor.VisitorForm.controls['TimeOut'].setValue(this.visitorRow.TimeOut);
       this.visitor.VisitorForm.controls['ManagerId'].setValue(this.managerId);

       
       console.log(this.visitorRow);
    
      },
      err=>{
        console.log(err);
      }
    );
  }

  exitTime(){
    let visitorData = this.visitor.VisitorForm.value;
    this._service.updateVisitor(this.visitorId, visitorData).subscribe(
      res=>{
        this.listVisitor();
        alert('Exit time entered success');
        this.closebutton.nativeElement.click();
      },
      err=>{
        console.log(err);
      }
    );
  }

  resetForm(){
    this.visitor.VisitorForm.reset();
        this.visitorRow= new Visitor();
  }

  fetchVisitorId(id:number){
    this.visitorId =  id;
   }

   removeVisitor(){
    this._service.deleteVisitor(this.visitorId).subscribe(
      res=>{
        this.listVisitor();
        this.closebutton.nativeElement.click();
      },
      err=>{
        console.log(err);
      }
    );
   }

}
