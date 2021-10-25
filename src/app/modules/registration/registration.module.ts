import { RegistrationDirective } from './../../directives/registrationdirectives/registration.directive';
import { LoginModule } from '../login/login.module';
import { RegistrationService } from './../../services/registration.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationRoutingModule } from './registration-routing.module';
import { RegistrationComponent } from './registration/registration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [RegistrationComponent, RegistrationDirective],
  imports: [
    CommonModule,
    RegistrationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    LoginModule,
  ],
  providers: [RegistrationService],
})
export class RegistrationModule {}
