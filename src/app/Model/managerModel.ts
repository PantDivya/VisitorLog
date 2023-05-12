import { FormGroup,FormBuilder, Validators } from "@angular/forms";

export class Manager{
    public Name:string="";
    public Contact:string="";
    public Department:string="";
    public IsActive:string="";
    public ManagerForm: FormGroup;

    constructor(){
    let formBuilder = new FormBuilder();
    this.ManagerForm = formBuilder.group({
        Name:['',[Validators.required]],
        Contact:['',Validators.compose([Validators.required,Validators.pattern('^[0-9]{10,10}$')])],
        Department:['',[Validators.required]]       
    });
    }
}