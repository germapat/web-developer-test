import { Component } from '@angular/core';
import { Item } from './item.model';

@Component({
  selector: 'app-prueba',
  templateUrl:'prueba.component.html'
})
export class PruebaComponent {
  ng4 = 'Realizado con Angular 4';
  title1 = 'Algo Inicial';
  items= new Item('Item', 'Inicial');

  constructor() {}

  
  ChangeItemObject(): void {
    this.items = new Item('Segundo', 'Item');
  }
}