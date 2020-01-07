import { Component, OnInit, Input } from '@angular/core';
import {ValidateService} from '../../services/validate.service'
import {AuthService} from '../../services/auth.service'
import {Router, ActivatedRoute} from '@angular/router';
import { slideInOutAnimation } from '../_animations/index';
import { Subscription } from 'rxjs/Subscription';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-register',
  moduleId: module.id.toString(),
  templateUrl: './register.component.html',
  styleUrls: ['../_content/app.less'], //'./register.component.css',
  providers:[AuthService],//,PubSubService],
    // make fade in animation available to this component
  animations: [slideInOutAnimation],

    // attach the fade in animation to the host (root) element of this component
  host: { '[@slideInOutAnimation]': '' }
})

export class RegisterComponent implements OnInit {
   // @Input('tipo') tipo: String;
  title:String = 'Agregar Usuario'
  subscription: Subscription
  userUsername:any={}
  userDoc: any={}
  validar:Boolean
  user: any = {}
  tipos =[];

  constructor(
    private validateService: ValidateService,
    private authService:AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessage:FlashMessagesService,
   ) {/*{
    this.router.events.subscribe(path => {//console.log('path = ', path);
      });*/
    } 

  ngOnInit() {
    let userId = String(this.route.snapshot.params['id'])
    if (userId!=='new') {
    this.getUserById(userId)
    this.title = 'Editar Usuario'
    } else {
     this.user.act=true
    }
   } 
    
    onRegisterSubmit(){
    let userId = String(this.route.snapshot.params['id'])
    // Required Fields
    if(!this.validateService.validateRegister(this.user)){
      this.flashMessage.show('Por favor ingrese todos los campos', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    // Validate Email
    if(!this.validateService.validateEmail(this.user.email)){
      this.flashMessage.show('Por favor ingrese un email válido', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }
 }

  getUserById(id){
    this.authService.getUserById(id)
      .subscribe((data)=>{
        this.user=(data)
      })
    }

  saveUser(userId){  
  if(userId=='new'){
     this.authService.registerUser(this.user)
       .subscribe(data =>{
        //if(data.status=201){
          if(data.success=true){
        // console.log('new 201')
          this.flashMessage.show('Usuario registrado, ya puede iniciar sesión', {cssClass: 'alert-success', timeout: 930000});
       //  this.pubSubService.publish('users-updated');          
          this.router.navigate(['/users'])
        } else {
       //   console.log('new 501')
          this.flashMessage.show('Algo salió mal :-(', {cssClass: 'alert-danger', timeout: 930000});
          this.router.navigate(['/users'])
        }
     })
     } else {
    this.authService.putUser(this.user)
       .subscribe(data =>{
        if(data.success=true){
         // console.log('update 201')
          this.flashMessage.show('Usuario actualizado con éxito', {cssClass: 'alert-success', timeout: 930000});
      //    this.pubSubService.publish('users-updated');          
          this.router.navigate(['/users'])
        } else {
          //console.log('update 501')
          this.flashMessage.show('Algo salió mal :-(', {cssClass: 'alert-danger', timeout: 930000});
          this.router.navigate(['/users'])
       }
      });
    }
   } 
}  