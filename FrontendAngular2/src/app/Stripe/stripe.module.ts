import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { stripeComponent } from './stripe.component';
import { stripeAuthResolver } from './stripe-auth-resolver.service';
import { SharedModule } from '../shared';


const stripeRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'stripe/:id',
    component: stripeComponent,
    resolve: {
      isAuthenticated: stripeAuthResolver
    }
  }
]);

@NgModule({
  imports: [
    stripeRouting,
    SharedModule,
    ToastModule.forRoot()
  ],
  declarations: [
    stripeComponent
  ],
  providers: [
    stripeAuthResolver
  ]
})
export class stripeModule {}
