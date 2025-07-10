import { Injectable, ApplicationRef, Injector, createComponent } from '@angular/core';
import { ConfirmationPopupComponent } from '../confirmation-popup/confirmation-popup.component';

@Injectable({ providedIn: 'root' })
export class ConfirmationPopupService {
  constructor(
    private appRef: ApplicationRef,
    private injector: Injector
  ) {}

  show(message: string): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      const componentRef = createComponent(ConfirmationPopupComponent, {
        environmentInjector: this.appRef.injector,
        elementInjector: this.injector
      });

      componentRef.instance.message = message;
      componentRef.instance.decision.subscribe((confirmed: boolean) => {
        this.appRef.detachView(componentRef.hostView);
        componentRef.destroy();
        resolve(confirmed);
      });

      this.appRef.attachView(componentRef.hostView);
      const domElem = (componentRef.hostView as any).rootNodes[0] as HTMLElement;
      document.body.appendChild(domElem);
    });
  }
}
