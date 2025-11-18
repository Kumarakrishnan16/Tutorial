import { HttpClient } from '@angular/common/http';
import { Injectable} from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareService {


  constructor(private http: HttpClient) { }

  give(data:any){
    return this.http.post("http://localhost:3000/Database",data)
  }


   send(){
    return this.http.get("http://localhost:3000/Database");
  }


  sender(id:any){
    return this.http.get(`http://localhost:3000/Database/${id}`);
  }

  modify(id:any, db: any) {
    return this.http.put(`http://localhost:3000/Database/${id}`, db);
  }

  remove(id: number) {
    return this.http.delete(`http://localhost:3000/Database/${id}`);
  }
  }

