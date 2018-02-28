import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Dinosaur } from '../models'
import { ApiService } from './api.service';

@Injectable()
export class DinosaurService {
  //private apiURL = 'http://localhost:8000/dinosaurs/?format=json';
  private apiURL = 'http://localhost:8081/api/events/?format=json';

  constructor(private http: Http,private apiService: ApiService) { }

  getDinos(): Observable<Dinosaur> {
    return this.apiService.get('events/')
    .map(data => data)
  }

  getOneDinos(id): Observable<Dinosaur> {
    let apiURLone='http://localhost:8081/api/events/'+id+'/?format=json';
    var dinos=this.http.get(apiURLone)
    .map(response => response.json())
    return dinos;
  }

  getTypeDinos(type): Observable<Dinosaur> {
    let apiURLone='http://localhost:8081/api/events/category/'+type+'/?format=json';
    var dinos=this.http.get(apiURLone)
    .map(response => response.json())
    return dinos;
  }

  getNameDinos(name): Observable<Dinosaur> {
    let apiURLone='http://localhost:8081/api/events/name/'+name+'/?format=json';
    var dinos=this.http.get(apiURLone)
    .map(response => response.json())
    return dinos;
  }

}
