import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';
import { ServiceType } from '../Interface/service-type';

@Injectable({
  providedIn: 'root'
})
export class ServiceTypeService {

  private endPoint:string = environment.endPoint;
  private apiUrl:string = this.endPoint + "TipoDeServicios/";

  constructor(private http:HttpClient) { }

  getList():Observable<ServiceType[]>
  {
    return this.http.get<ServiceType[]>(`${this.apiUrl}Lista`);
  }

}
