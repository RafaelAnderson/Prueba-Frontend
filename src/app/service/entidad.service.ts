import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { LoginUsuario } from '../models/login-usuario';
import { Jwt } from '../models/jwt';
import { Entidad } from '../models/entidad';

@Injectable({
  providedIn: 'root',
})
export class EntidadService {
  authURL = 'http://localhost:8090/entidad';

  private MessageChange = new Subject<string>();

  constructor(protected httpClient: HttpClient) { }

  setMessageChange(mensaje: string) {
    this.MessageChange.next(mensaje);
  }

  getMessageChange() {
    return this.MessageChange.asObservable();
  }

  public findAll(): Observable<Entidad[]> {
    return this.httpClient.get<Entidad[]>(this.authURL + '/listar');
  }

  public getEntidad(id: string): Observable<Entidad[]> {
    return this.httpClient.get<Entidad[]>(this.authURL + '/buscar/' + id);
  }

  public createEntidad(entidad: Entidad[]): Observable<any> {
    return this.httpClient.post<any>(this.authURL + '/crear', entidad);
  }

  public updateEntidad(id: string, entidad: Entidad): Observable<any> {
    return this.httpClient.put<any>(this.authURL + '/actualizar/' + id, entidad);
  }

  public deleteEntidad(id: string): Observable<any> {
    return this.httpClient.delete<any>(this.authURL + '/eliminar/' + id);
  }
}
