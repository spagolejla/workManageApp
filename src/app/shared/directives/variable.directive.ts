import { Directive, Input } from "@angular/core";

@Directive({
    selector: '[value]',
    exportAs: 'value'
  })
 export class VarDirective {
    @Input() value:any;
  }