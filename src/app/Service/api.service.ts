import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Manager } from '../Model/managerModel';
import { Employee } from '../Model/employeeModel';
import { Visitor } from '../Model/visitorModel';
import { Login } from '../Model/loginModel';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private _http:HttpClient){}

  postManager(managerP:Manager):Observable<any>{
    return this._http.post("https://localhost:7162/api/Manager",managerP,{responseType:'json'})
  }

  getManager():Observable<any>{
    return this._http.get("https://localhost:7162/api/Manager",{responseType:'json'})
  }

  getManagerById(id:number):Observable<any>{
    return this._http.get("https://localhost:7162/api/Manager/"+id,{responseType:'json'})

  }

  updateManager(id:number,manager:Manager):Observable<any>{
    return this._http.put("https://localhost:7162/api/Manager/"+id,manager,{responseType:'json'})

  }

  deleteManager(id:number):Observable<any>{
    return this._http.delete("https://localhost:7162/api/Manager/"+id,{responseType:'json'});
  }

  postEmployee(employee:Employee):Observable<any>{
    return this._http.post("https://localhost:7162/api/Employee",employee,{responseType:'json'})
  }

  getEmployee():Observable<any>{
    return this._http.get("https://localhost:7162/api/Employee",{responseType:'json'})
  }

  getEmployeeById(id:number):Observable<any>{
    return this._http.get("https://localhost:7162/api/Employee/"+id,{responseType:'json'})

  }

  updateEmployee(id:number,employee:Employee):Observable<any>{
    return this._http.put("https://localhost:7162/api/Employee/"+id,employee,{responseType:'json'})
  }

  deleteEmployee(id:number):Observable<any>{
    return this._http.delete("https://localhost:7162/api/Employee/"+id,{responseType:'json'});

  }

  postVisitor(visitor:Visitor):Observable<any>{
    return this._http.post("https://localhost:7162/api/Visitor",visitor,{responseType:'json'})
  }

  getVisitors():Observable<any>{
    return this._http.get("https://localhost:7162/api/Visitor",{responseType:'json'})
  }

  getVisitorById(id:number):Observable<any>{
    return this._http.get("https://localhost:7162/api/Visitor/"+id,{responseType:'json'})

  }

  updateVisitor(id:number,employee:Employee):Observable<any>{
    return this._http.put("https://localhost:7162/api/Visitor/"+id,employee,{responseType:'json'})
  }

  deleteVisitor(id:number):Observable<any>{
    return this._http.delete("https://localhost:7162/api/Visitor/"+id,{responseType:'json'});

  }
  doLogIn(credential:Login):Observable<any>{
    return this._http.post("https://localhost:7162/api/Authentication",credential,{responseType:'json'})
  }
} 

