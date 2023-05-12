import { FormGroup, FormBuilder, Validators } from "@angular/forms";

export class Visitor{
    public Name:string="";
    public Purpose:string="";
    public TimeIn:string="";
    public TimeOut:string="";
    public ManagerId:number=0;
    public VisitorForm:FormGroup;

    constructor(){
    let formBuilder = new FormBuilder();
    this.VisitorForm= formBuilder.group({
        Name:['',[Validators.required]],
        Purpose:['',[Validators.required]],
        TimeIn:['',[Validators.required]],
        TimeOut:['',[Validators.required]],
        ManagerId:['',[Validators.required]]
    });
    }
}