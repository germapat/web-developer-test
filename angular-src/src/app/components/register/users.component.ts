import {AuthService} from '../../services/auth.service';
import {Router, ActivatedRoute} from '@angular/router';
import { Component, OnInit,OnDestroy } from '@angular/core'; 
import { fadeInAnimation } from '../_animations/index';
import { Subscription } from 'rxjs/Subscription';
import {PubSubService} from '../../services/pub-sub.service';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
    moduleId: module.id.toString(),
    selector: 'app-users',
    templateUrl: './users.component.html',   
    styleUrls: ['../_content/app.less'],

    // make fade in animation available to this component
    animations: [fadeInAnimation],
    providers:[AuthService,PubSubService],
    // attach the fade in animation to the host (root) element of this component
    host: { '[@fadeInAnimation]': '' }
})

export class UsersComponent implements OnInit,OnDestroy {
        users: Array<any>;
        subscription: Subscription;
        title:String;
       // tipo: String;
        userscount: Number;
      //  @input()tipo: String;       

    constructor(
    private authService:AuthService,
    private router: Router,
    private pubSubService: PubSubService,
    private flashMessage:FlashMessagesService,
    private route:ActivatedRoute
    ) {/* this.router.events.subscribe(path => {
         this.onUsers();
        //console.log('path = ', path);
        }); */   
    }

    onUsers(){
    //let tipo=String(this.route.snapshot.params['tipo']);
    //this.tipo=tipo;
    this.getUsers();
    this.title = 'Usuarios';
    this.subscription = this.pubSubService.on('users-updated')
        .subscribe(() => this.getUsers());
    }

    ngOnInit() {
      //  let tipo=[{cod:'CC', nombre:'Cedula'},{cod:'TI',nombre:'Tarjeta Identidad'}];
    this.onUsers();
    }
    
    getUsers(){
        this.authService.getUsers().subscribe(res => {
            this.users = res
            this.userscount=+this.users.length
        })
    }
 
    deleteUser(id){
        this.authService.deleteUser(id)
         .subscribe(data =>{
        if(data.status=201){
            this.flashMessage.show('Usuario eliminado con éxito', {cssClass: 'alert-success', timeout: 3000});
            this.pubSubService.publish('users-updated');  
        } else {
            this.flashMessage.show('Algo salió mal :-(', {cssClass: 'alert-danger', timeout: 3000});
         }
        })
    }
 
    ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    console.log('se destruyo el servicio')
    if(this.subscription){this.subscription.unsubscribe()};
    }
}