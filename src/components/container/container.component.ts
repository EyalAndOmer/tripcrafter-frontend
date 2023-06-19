import {Component, Input} from '@angular/core';
@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent {
  @Input() _maxWidth: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'xl';
  @Input() _classes: string = '';
  get containerClasses(): string[] {
    return [`max-width-${this._maxWidth}`, 'container', this._classes];
  }
}
