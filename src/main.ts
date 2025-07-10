import { ApplicationConfig } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { BehaviourService } from './app/services/behaviour-service';
import { ConfirmationPopupService } from './app/services/confirmation-popup.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    {
      provide: 'FAKEAPI_BASE_URL',
      useValue: 'https://fakestoreapi.com',
    },
    BehaviourService,
    ConfirmationPopupService
  ],
};

bootstrapApplication(AppComponent, appConfig);
