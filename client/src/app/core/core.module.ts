import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './guards/auth.guard';
import { AuthService } from './auth.service';
import { IsAdminGuard } from './guards/is-admin.guard';
import { IsOwnerGuard } from './guards/is-owner.guard';
import { appInterceptorProvider } from './app.interceptor';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule
  ],
  providers: [
    AuthGuard,
    IsAdminGuard,
    IsOwnerGuard,
    appInterceptorProvider,
    AuthService
  ],
  exports: [
    HeaderComponent,
    FooterComponent
  ]
})
export class CoreModule { }
