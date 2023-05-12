import { FormGroup, FormBuilder, Validators } from "@angular/forms";

export class Employee{
    public Name:string="";
    public Contact:string="";
    public Position:string="";
    public ManagerId:number=0;
    public EmployeeForm:FormGroup;

    constructor(){
    let formBuilder = new FormBuilder();
    this.EmployeeForm= formBuilder.group({
        Name:['',[Validators.required]],
        Contact:['',Validators.compose([Validators.required,Validators.pattern('^[0-9]{10,10}$')])],
        Position:['',[Validators.required]],
        ManagerId:['',[Validators.required]],
    });
    }
}