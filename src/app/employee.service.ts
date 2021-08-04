import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor( private _http:HttpClient) { }

  postemployee(data:any){
    return this._http.post("  http://localhost:3000/posts",data)
    .pipe(map(res => res))
  }
  getemployee(){
    return this._http.get("http://localhost:3000/posts")
    .pipe(map(res => res))
  }
  deleteemployee(id:any){
    return this._http.delete("http://localhost:3000/posts/"+id)
    .pipe(map(res => res))
  }
  updateemployee(id:any,data:any){
    return this._http.put("http://localhost:3000/posts/"+id,data)
  }
}
