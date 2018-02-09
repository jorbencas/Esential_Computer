import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AgmCoreModule } from '@agm/core';
import { detailsComponent } from './details.component';
import { detailsAuthResolver } from './details-auth-resolver.service';
import { SharedModule } from '../shared';

const detailsRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'details/:id',
    component: detailsComponent,
    resolve: {
      isAuthenticated: detailsAuthResolver
    }
  }
]);

@NgModule({
  imports: [
    detailsRouting,
    SharedModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDk4glV62znORj4WYNbidAwg1IGycf0yOg'
    })
  ],
  declarations: [
    detailsComponent
  ],
  providers: [
    detailsAuthResolver
  ]
})
export class detailsModule {}
