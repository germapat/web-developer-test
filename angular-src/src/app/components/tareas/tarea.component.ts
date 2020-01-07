import { Component, OnInit, Input } from '@angular/core';
import {ValidateService} from '../../services/validate.service'
import {TareaService} from '../../services/tarea.service'
import {Router, ActivatedRoute} from '@angular/router';
import { slideInOutAnimation } from '../_animations/index';
import { Subscription } from 'rxjs/Subscription';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service'
//import { Moment } from 'moment'

@Component({
  selector: 'app-tarea',
  moduleId: module.id.toString(),
  templateUrl: './tarea.component.html',
  styleUrls: ['../_content/app.less'],
  providers:[TareaService,AuthService],//,PubSubService],
 
    // make fade in animation available to this component
  animations: [slideInOutAnimation],

    // attach the fade in animation to the host (root) element of this component
  host: { '[@slideInOutAnimation]': '' }
})

export class TareaComponent implements OnInit {
 
  title:String = 'Agregar Tarea';
  subscription: Subscription;
  tarea: any = {};
  validar:Boolean;
  id:String;
  fecha: any
  hoy:any

  constructor(
    private validateService: ValidateService,
    private tareaService:TareaService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessage:FlashMessagesService,
    private authService: AuthService
   ) {
   
    } 

  ngOnInit() {
    this.hoy= new Date()
    let tareaId = this.route.snapshot.params['id'];
    if (tareaId!=='new') {
    this.getTareaById(tareaId);
    this.title = 'Editar Tarea';
    } else {
     this.tarea.act=true; 
    }
  } 
    
  onSubmit(){
    let user = JSON.parse(this.authService.UserData().getItem('user'));
    this.tarea.user= user._id
    //this.tarea.fechaVencimiento.moment.format("YYYY-MM-DD")
    //this.tarea.fechaVencimiento=this.tarea.fechaVencimiento.toISOString().subString(0,10)
    this.tarea.fechaVencimiento     =new Date(this.fecha + ' '+'00:00:00')
    // Required Fields
    if(!this.validateService.validateTarea(this.tarea)){
      this.flashMessage.show('Por favor ingrese los datos de la tarea', {cssClass: 'alert-danger', timeout: 3000});
      return false
    }
    this.saveTarea(this.route.snapshot.params['id'])
  }

  getTareaById(id){
    this.tareaService.getTareaById(id)
      .subscribe(data=>{
        this.tarea=data
        let date=String(new Date(this.tarea.fechaVencimiento)).split(' ')
        this.fecha=new Date(date[0]+' '+date[1] + ' ' +date[2] + ' ' + date[3]).toISOString().slice(0,10)
      })
    }
   
   saveTarea(id){
     if(id=='new'){
       console.log(this.tarea)
       this.tareaService.newTarea(this.tarea)
       .subscribe(data =>{
         console.log(data)
          if(data.status=201){
          this.flashMessage.show('Tarea registrada, ya puede iniciar la gestión', {cssClass: 'alert-success', timeout: 930000});         
          this.router.navigate(['/tareas'])
        } else {
          console.log(data)
          this.flashMessage.show('Algo salió mal :-(', {cssClass: 'alert-danger', timeout: 930000});
          this.router.navigate(['/tareas'])
        }
     })
     } else {
        this.tareaService.putTarea(this.tarea)
       .subscribe(data =>{
        if(data.status=201){
          this.flashMessage.show('Tarea actualizado con éxito', {cssClass: 'alert-success', timeout: 930000});   
          this.router.navigate(['/tareas'])
        } else {
          this.flashMessage.show('Algo salió mal :-(', {cssClass: 'alert-danger', timeout: 930000});
          this.router.navigate(['/tareas'])
          }
      })
    }
  }
}