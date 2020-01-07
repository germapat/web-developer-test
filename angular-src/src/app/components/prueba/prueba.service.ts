import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class PruebaService {

  constructor(private http:Http) {
 
  }
  getItems(){
   return this.http.get('https://jsonplaceholder.typicode.com/posts')
      .map(res => res.json());
  }
}
