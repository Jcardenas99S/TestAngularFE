import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';
import { Customer } from '../Interface/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private endPoint:string = environment.endPoint;
  private apiUrl:string = this.endPoint + "Customers/";

  constructor(private http:HttpClient) { }

  getList():Observable<Customer[]>
  {
    return this.http.get<Customer[]>(`${this.apiUrl}Lista`);
  }

  add(modelo:Customer):Observable<Customer>{
    return this.http.post<Customer>(`${this.apiUrl}Guardar`, modelo)
  }

  update(idCustomer:number,modelo:Customer):Observable<Customer>{
    return this.http.put<Customer>(`${this.apiUrl}Update/${idCustomer}`, modelo)
  }

  delete(idCustomer:number,modelo:Customer):Observable<void>{
    return this.http.put<void>(`${this.apiUrl}Delete/${idCustomer}`, modelo)
  }

}
