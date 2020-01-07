import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {} from './auth.service'

//import {tokenNotExpired} from 'angular2-jwt';

@Injectable()
export class TareaService {
  tarea: any;
  isDev:boolean;

  constructor(private http:Http) {
    this.isDev = false; // Change to false before deployment
  }
    getTareas(){
    let ep = this.prepEndpoint('tareas/');
    return this.http.get(ep)
      .map(res => res.json());
    }

    getTareasAct(){
     // var date = new Date();
     //  var today = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();      
      let ep = this.prepEndpoint('tareas/act');
      return this.http.get(ep)     
      .map(res => res.json())
      .map((res: Array<any>) => 
        res.filter(tar => {
          tar.act===true
        }).sort(((a, b) => b.fechaVencimiento - a.fechaVencimiento))
      )
    }

    deleteTarea(id){
    let ep = this.prepEndpoint('tareas/tareasDel/'+ id);
    return this.http.delete(ep)
        .map(res => res.json());
    }

    putTarea(tarea){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    let ep = this.prepEndpoint('tareas/tarea');
    return this.http.put(ep, JSON.stringify(tarea),{headers: headers})
      .map(res => res.json());
    }

    getTareaById(id){
    let ep = this.prepEndpoint('tareas/'+ id);
    return this.http.get(ep)
      .map(res => res.json());
    }

    newTarea(tarea){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    let ep = this.prepEndpoint('tareas/tarea/');
    console.log(ep + ' in servicio: ' + JSON.stringify(tarea))
    return this.http.post(ep, tarea,{headers: headers})
      .map(res => res.json())
  }

   prepEndpoint(ep){
    if(this.isDev){
      return ep;
    } else {
      return 'http://localhost:3002/'+ep;
    }
  }
}