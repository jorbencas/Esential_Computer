import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { contactComponent } from './contact.component';
import { contactAuthResolver } from './contact-auth-resolver.service';
import { SharedModule } from '../shared';


const contactRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'contact',
    component: contactComponent,
    resolve: {
      isAuthenticated: contactAuthResolver
    }
  }
]);

@NgModule({
  imports: [
    contactRouting,
    SharedModule,
    ToastModule.forRoot()
  ],
  declarations: [
    contactComponent
  ],
  providers: [
    contactAuthResolver
  ]
})
export class contactModule {}
