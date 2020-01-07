import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UsersComponent } from './components/register/users.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { TareasComponent } from './components/tareas/tareas.component';
import { TareaComponent } from './components/tareas/tarea.component';
import { PruebaComponent } from './components/prueba/prueba.component';
import { ItemComponent } from './components/prueba/item.component';
import {AuthGuard} from './guards/auth.guard';

const appRoutes: Routes =  [
  //{path:'profile', component: ProfileComponent, canActivate:[AuthGuard]},{path:'dashboard', component: DashboardComponent, canActivate:[AuthGuard]},
  {path:'', pathMatch: 'full',component: HomeComponent, canActivate:[AuthGuard]},
  {path:'login', component: LoginComponent},
  {path:'profile', component: PruebaComponent, canActivate:[AuthGuard] },
  {path:'users', component: UsersComponent,canActivate:[AuthGuard]},
  {path:'user/:id', component: RegisterComponent,canActivate:[AuthGuard]},
  {path:'tareas', component: TareasComponent,canActivate:[AuthGuard]},
  {path:'tarea/:id', component: TareaComponent,canActivate:[AuthGuard]},
        // otherwise redirect to home
  { path: '**', redirectTo: '' }
]

//Solo con modulos se puede hacer lazy load. Se encapsula en modulos y no se importa, sino que se 
//referencia la ruta del modul que solo se carga al llamarlos:
//path:'ejemplo', loadChildren:'../../about/about.module#AboutModule'


@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule],
    providers: [AuthGuard]
})
export class AppRoutingModule { }

export const routedComponents = [
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    UsersComponent,
    HomeComponent,
    TareaComponent,
    TareasComponent,
    ProfileComponent,
    PruebaComponent,
    ItemComponent
]