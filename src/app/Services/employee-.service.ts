import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';
import { Employee } from '../Interface/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private endPoint:string = environment.endPoint;
  private apiUrl:string = this.endPoint + "Empleado/";

  constructor(private http:HttpClient) { }

  getList():Observable<Employee[]>
  {
    return this.http.get<Employee[]>(`${this.apiUrl}Lista`);
  }

  add(modelo:Employee):Observable<Employee>{
    return this.http.post<Employee>(`${this.apiUrl}Guardar`, modelo)
  }

  update(idEmployee:number,modelo:Employee):Observable<Employee>{
    return this.http.put<Employee>(`${this.apiUrl}Update/${idEmployee}`, modelo)
  }

  delete(idEmployee:number,modelo:Employee):Observable<void>{
    return this.http.put<void>(`${this.apiUrl}Delete/${idEmployee}`, modelo)
  }
  
}
