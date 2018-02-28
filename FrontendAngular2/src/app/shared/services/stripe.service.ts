import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { ApiService } from './api.service';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable()
export class stripeService {
    constructor (
      private http: Http,
        private apiService: ApiService
      ) {}

      checkout(data): Observable<string> {
        console.log(data.stripeToken);
        return this.apiService.post('stripe/', {stripeToken: data})
        .map(
          message => {
            return message;
          }
        )
}
}
