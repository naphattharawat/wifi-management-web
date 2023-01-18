import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[autocompleteOff]'
})
export class AutocompleteOffDirective {
  constructor(private _el: ElementRef) {
    const w: any = window;
    const isChrome = w.chrome;
    if (isChrome) {
      this._el.nativeElement.setAttribute('autocomplete', 'off');
      this._el.nativeElement.setAttribute('autocorrect', 'off');
      this._el.nativeElement.setAttribute('autocapitalize', 'off');
      this._el.nativeElement.setAttribute('spellcheck', 'false');
    }
  }
}
