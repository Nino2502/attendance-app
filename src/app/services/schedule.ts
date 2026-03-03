import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Schedule {
  
  private api = 'http://localhost:8080/api/schedules';


  constructor(private http: HttpClient){}


  getAll(){
    return this.http.get<any[]>(this.api);
    
  }
}
