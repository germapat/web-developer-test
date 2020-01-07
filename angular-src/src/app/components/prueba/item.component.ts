import { Component, Input } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { Item } from './item.model';

@Component({
  selector: 'app-item',
  styles: ['div {border: 1px solid black}'],
  template: `
    <div>
      <h3>{{ title }}</h3>
      <p>
        <label>Items:</label>
        <span>{{item.item1}} {{item.item2}}</span>
      </p>
    </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemComponent {
  @Input() title: string
  @Input() item: Item

    constructor() {}

}