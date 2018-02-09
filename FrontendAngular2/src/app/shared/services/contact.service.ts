import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { ApiService } from './api.service';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable()
export class ContactService {
    constructor (
      private http: Http,
        private apiService: ApiService
      ) {}

     contact(data): Observable<string> {
      return this.apiService.post('contact/', {dades: data})
      .map(
        data => {
          return data;
        }
      );
  }

 


}

