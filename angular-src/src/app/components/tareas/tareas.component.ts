import {TareaService} from '../../services/tarea.service';
import {Router, ActivatedRoute} from '@angular/router';
import { Component, OnInit,OnDestroy } from '@angular/core'; 
import { fadeInAnimation } from '../_animations/index';
import { Subscription } from 'rxjs/Subscription';
import {PubSubService} from '../../services/pub-sub.service';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
    moduleId: module.id.toString(),
    selector: 'app-tareas',
    templateUrl: './tareas.component.html',   
    styleUrls: ['../_content/app.less'],
    // make fade in animation available to this component
    animations: [fadeInAnimation],
    providers:[TareaService,PubSubService],
    // attach the fade in animation to the host (root) element of this component
    host: { '[@fadeInAnimation]': '' }
})

export class TareasComponent implements OnInit,OnDestroy {
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
        this.tareaService.getTareas().subscribe(res => {
            this.tareas = res
            this.tareascount=+this.tareas.length
            console.log(this.tareas)
        })       
    }
 
    deleteTarea(id){
        this.tareaService.deleteTarea(id)
         .subscribe(data =>{
        if(data.status=201){
            this.flashMessage.show('Tarea eliminada con éxito', {cssClass: 'alert-success', timeout: 3000});
            this.pubSubService.publish('tareas-updated');  
        } else {
            this.flashMessage.show('Algo salió mal :-(', {cssClass: 'alert-danger', timeout: 3000});
         }
        })
    }
 
    ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    if(this.subscription){this.subscription.unsubscribe()};
    console.log('se destruyo el servicio')
    }
}