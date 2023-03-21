import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';
import { Service } from '../Interface/service';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private endPoint:string = environment.endPoint;
  private apiUrl:string = this.endPoint + "Servicios/";

  constructor(private http:HttpClient) { }

  getList():Observable<Service[]>
  {
    return this.http.get<Service[]>(`${this.apiUrl}Lista`);
  }

  add(modelo:Service):Observable<Service>{
    return this.http.post<Service>(`${this.apiUrl}Guardar`, modelo)
  }

  update(idService:number,modelo:Service):Observable<Service>{
    return this.http.put<Service>(`${this.apiUrl}Update/${idService}`, modelo)
  }

  delete(idService:number,modelo:Service):Observable<void>{
    return this.http.put<void>(`${this.apiUrl}Delete/${idService}`, modelo)
  }
}
