import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';
import { Pet } from '../Interface/pet';

@Injectable({
  providedIn: 'root'
})
export class PetService {

  private endPoint:string = environment.endPoint;
  private apiUrl:string = this.endPoint + "Mascotas/";

  constructor(private http:HttpClient) { }

  getList():Observable<Pet[]>
  {
    return this.http.get<Pet[]>(`${this.apiUrl}Lista`);
  }

  add(modelo:Pet):Observable<Pet>{
    return this.http.post<Pet>(`${this.apiUrl}Guardar`, modelo)
  }

  update(idPet:number,modelo:Pet):Observable<Pet>{
    return this.http.put<Pet>(`${this.apiUrl}Update/${idPet}`, modelo)
  }

  delete(idPet:number,modelo:Pet):Observable<void>{
    return this.http.put<void>(`${this.apiUrl}Delete/${idPet}`, modelo)
  }
}
