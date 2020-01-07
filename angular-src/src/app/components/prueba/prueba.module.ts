import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { PruebaComponent } from './prueba.component';
import { ItemComponent } from './item.component';
import { PruebaService } from './prueba.service';


@NgModule({
  imports: [
    BrowserModule
  ],
  declarations: [

  ],
  providers:[PruebaService]
})
export class PruebaModule {
}

//platformBrowserDynamic().bootstrapModule(PruebaModule);