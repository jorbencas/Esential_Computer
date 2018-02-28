import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { recoverComponent } from './recover.component';
import { recoverAuthResolver } from './recover-auth-resolver.service';
import { SharedModule } from '../shared';

const recoverRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'recover',
    component: recoverComponent,
    resolve: {
      isAuthenticated: recoverAuthResolver
    }
  }
]);

@NgModule({
  imports: [
    recoverRouting,
    SharedModule
  ],
  declarations: [
    recoverComponent
  ],
  providers: [
    recoverAuthResolver
  ]
})
export class recoverModule {}
