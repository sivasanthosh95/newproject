import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { employeemodel } from './empmodel';
declare let $:any;
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  showupdate:boolean;
  showsubmit:boolean;
  employeevalue:FormGroup;
  employeedata:any;
  empmodelobj:employeemodel=new employeemodel();
  constructor( private builder:FormBuilder,private _api:EmployeeService) { }

  ngOnInit(): void {
  this.employeevalue=this.builder.group({
    'name':['',Validators.required],
    'email':['',Validators.required],
    'mobileno':['',Validators.required],
    'salary':['',Validators.required]
  }); 
  this.getemp();
  }

  postemp(){
   this._api.postemployee(this.employeevalue.value)
   .subscribe(sub =>{
    console.log(sub);
    alert("Employee Added Sucessfully");
    $("#exampleModal")?.click();
    this.getemp();
   },
   error =>{
     console.log("something went worng");
   });
  }
  getemp(){
    this._api.getemployee().subscribe(sub =>{
      console.log(sub);
      this.employeedata=sub;
    });
  }
  deleteemp(row:any){
    var del=confirm("Are you want to do delete this data");
    if(del){
      this._api.deleteemployee(row.id).subscribe(sub =>{
        console.log(sub);
        this.getemp();
        alert("Employee Deleted Sucessfully");
      });
     
    }
   
  }
  onedit(row:any){
    this.showupdate=true;
    this.showsubmit=false;
  this.empmodelobj.empid=row.id;
  this.employeevalue.controls['name'].setValue(row.name);
  this.employeevalue.controls['email'].setValue(row.email);
  this.employeevalue.controls['mobileno'].setValue(row.mobileno);
  this.employeevalue.controls['salary'].setValue(row.salary);
  }
  updateemp(){
    this._api.updateemployee(this.empmodelobj.empid,this.employeevalue.value)
    .subscribe(sub =>{
      console.log(sub);
      this.employeevalue.reset();
      alert("updated successfully");
      $("#exampleModal")?.click();
      this.getemp();
    })
  }
  hideupdatebutton(){
    this.showsubmit=true;
    this.showupdate=false;
  }
}
