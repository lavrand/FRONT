import { Directive, HostListener, ElementRef } from '@angular/core';
import { ModalService } from './modal.service';

@Directive({
  selector: '[appModalEscClose]'
})
export class DirectivesDirective {
  constructor(
    private element: ElementRef,
    private _modal: ModalService
    ) {}

  @HostListener('document:keydown', ['$event'])
  onKeyPressed(event: KeyboardEvent): void {
    console.log('event', event.key);
    if (event['key'] === 'Escape') {
      this._modal.closeModal();
    }
  }
}
