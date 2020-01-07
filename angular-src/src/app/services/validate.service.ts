import { Injectable } from '@angular/core';
import { AuthService} from '../services/auth.service';
import 'rxjs';


@Injectable()
export class ValidateService {
   user =<any> [];
   tarea =<any> [];
  //users: Array<any>;

  constructor(private authService:AuthService) { }

  validateEmail(email){
    if(!email){
      return true}else{
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
    }
  }

  validateRegister(user){
    if(user.name == undefined || user.email == undefined || user.username == undefined || user.password == undefined){
      return false
    } else {
      return true
    }
  }

  validateTarea(tarea){
    if(tarea.descripcion === undefined || tarea.prioridad === undefined || tarea.fechaVencimiento === undefined ){
      console.log(tarea)
      return false
    } else {
      return true
    }
  }
}