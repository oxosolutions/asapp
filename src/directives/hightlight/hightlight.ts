import { Directive } from '@angular/core';

/**
 * Generated class for the HightlightDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
@Directive({
  selector: '[hightlight]' // Attribute selector
})
export class HightlightDirective {

  constructor() {
    console.log('Hello HightlightDirective Directive');
  }

}
