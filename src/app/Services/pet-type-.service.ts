import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';
import { PetType } from '../Interface/pet-type';
@Injectable({
  providedIn: 'root'
})
export class PetTypeService {

  private endPoint:string = environment.endPoint;
  private apiUrl:string = this.endPoint + "TipoDeMascota/";

  constructor(private http:HttpClient) { }

  getList():Observable<PetType[]>
  {
    return this.http.get<PetType[]>(`${this.apiUrl}Lista`);
  }
}
