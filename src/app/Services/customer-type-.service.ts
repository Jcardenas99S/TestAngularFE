import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';
import { CustomerType } from '../Interface/customer-type';

@Injectable({
  providedIn: 'root'
})
export class CustomertypeService {

  private endPoint:string = environment.endPoint;
  private apiUrl:string = this.endPoint + "TipoDeCustomer/";

  constructor(private http:HttpClient) { }

  getList():Observable<CustomerType[]>
  {
    return this.http.get<CustomerType[]>(`${this.apiUrl}Lista`);
  }
}
