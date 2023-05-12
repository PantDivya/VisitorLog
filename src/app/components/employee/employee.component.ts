import { Component, OnInit, ViewChild } from '@angular/core';
import { Employee } from 'src/app/Model/employeeModel';
import { ApiService } from 'src/app/Service/api.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit{

  employee:Employee = new Employee();
  managerList:any;
  managerId: number=0;
  employeeId: number = 0;
  employeeList: any;
  employeeRow: Employee = new Employee();
  isEmployeeSelected:boolean=false;
  
  
  @ViewChild('closebutton') closebutton:any;

  constructor(private _service:ApiService) {}
  

  ngOnInit(): void {
    this.listEmployee();
    this.listManager();
  }

  listEmployee(){
    this._service.getEmployee().subscribe(
      res=>{
        this.employeeList = res;
        console.log(this.employeeList);
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

  addEmployee(){
    let employeeData = this.employee.EmployeeForm.value;
    this._service.postEmployee(employeeData).subscribe(
      res=>{
        this.listEmployee();
        this.employee.EmployeeForm.reset();
        alert("Employee added successfully");
        
        this.closebutton.nativeElement.click();
      },
      err=>{
        console.log(err);
      }
    );
  }

  onManagerChange(event:any){
    this.managerId = event.target.value;
  }

  selectedEmployee(id:number){
    this.isEmployeeSelected = true;
    this.fetchEmployeeId(id);
    this._service.getEmployeeById(id).subscribe(
      res=>{
       this.employeeRow=res;
       this.managerId=res.Manager.Id;
       
       this.employee.EmployeeForm.controls['Name'].setValue(this.employeeRow.Name);
       this.employee.EmployeeForm.controls['Contact'].setValue(this.employeeRow.Contact);
       this.employee.EmployeeForm.controls['Position'].setValue(this.employeeRow.Position);
       this.employee.EmployeeForm.controls['ManagerId'].setValue(this.managerId);
       console.log(this.employeeRow);
    
      },
      err=>{
        console.log(err);
      }
    );
  }

  editEmployee(){
    let employeeData = this.employee.EmployeeForm.value;
    this._service.updateEmployee(this.employeeId, employeeData).subscribe(
      res=>{
        this.listEmployee();
        alert('Employee Updated successfully');
        this.closebutton.nativeElement.click();
      },
      err=>{
        console.log(err);
      }
    );
  }

  resetForm(){
    this.employee.EmployeeForm.reset();
        this.employeeRow= new Employee();
  }

  fetchEmployeeId(id:number){
    this.employeeId =  id;
   }

   removeEmployee(){
    this._service.deleteEmployee(this.employeeId).subscribe(
      res=>{
        this.listEmployee();
        this.closebutton.nativeElement.click();
      },
      err=>{
        console.log(err);
      }
    );
   }

   resetEmployeeForm(){
    this.employee=new Employee();
    this.employee.EmployeeForm.reset();
  }

}
