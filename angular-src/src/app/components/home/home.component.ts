import {TareaService} from '../../services/tarea.service';
import {Router, ActivatedRoute} from '@angular/router';
import { Component, OnInit,OnDestroy } from '@angular/core'; 
import { fadeInAnimation } from '../_animations/index';
import { Subscription } from 'rxjs/Subscription';
import {PubSubService} from '../../services/pub-sub.service';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers:[TareaService,PubSubService]
})
export class HomeComponent implements OnInit,OnDestroy {
    tareas: Array<any>;
    subscription: Subscription;
    title:String;
   // tipo: String;
    tareascount: Number;
  //  @input()tipo: String;       
  
  constructor(
  private tareaService:TareaService,
  private router: Router,
  private pubSubService: PubSubService,
  private flashMessage:FlashMessagesService,
  private route:ActivatedRoute
  ) {/*this.router.events.subscribe(path => {
     this.onTareas();
    //console.log('path = ', path);
    });*/
  }
  
  
  ngOnInit() {
    this.getTareas();
    this.title = 'Tareas';
    this.subscription = this.pubSubService.on('tareas-updated')
        .subscribe(() => this.getTareas());
  }
  
  getTareas(){
    this.tareaService.getTareasAct().subscribe(res => {
        this.tareas = res
        this.tareascount=+this.tareas.length
        console.log(this.tareas)
        this.tareas.forEach(tar =>{
          this.flashMessage.show(tar.fechaVencimiento, {cssClass: 'alert-danger', timeout: 3000})
        })
    })       
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    if(this.subscription){this.subscription.unsubscribe()};
    console.log('se destruyo el servicio')
    }
}