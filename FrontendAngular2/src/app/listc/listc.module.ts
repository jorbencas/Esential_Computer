import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { listcComponent } from './listc.component';
import { listcAuthResolver } from './listc-auth-resolver.service';
import { SharedModule } from '../shared';

const listcRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'list',
    component: listcComponent,
    resolve: {
      isAuthenticated: listcAuthResolver
    }
  },
  {
    path: 'list/type/:id',
    component: listcComponent,
    resolve: {
      isAuthenticated: listcAuthResolver
    }
  }
]);

@NgModule({
  imports: [
    listcRouting,
    SharedModule
  ],
  declarations: [
    listcComponent
  ],
  providers: [
    listcAuthResolver
  ]
})
export class listcModule {}
