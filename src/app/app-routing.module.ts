import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { combineLatest } from 'rxjs/operators';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { CheckoutComponent } from './containers/checkout/checkout.component';
import { ProductDetailComponent } from './containers/product-detail/product-detail.component';
import { ProductListComponent } from './containers/product-list/product-list.component';
import { DemoComponent } from './demo/demo.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: '', component: DemoComponent },
  { path:'products', component:ProductListComponent},
  { path: 'detail/:pid', component: ProductDetailComponent },
  { path:'checkout', component: CheckoutComponent, canActivate: [AuthGuard] },
  { path:'**', component: ErrorPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
