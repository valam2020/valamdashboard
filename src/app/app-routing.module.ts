import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CustomerComponent } from './Customer/customer/customer-component/customer/customer.component';
import { CustomerModule } from './Customer/customer/customer.module';

const routes: Routes = [
{
  path:"login",
  component: LoginComponent
},
{
  path: 'customer',
  component: CustomerComponent,
  //  canActivate:[AuthGuard],
  children: [
    {path: 'dashboard', 
    loadChildren: () => import('./Customer/customer/customer.module').then(x => x.CustomerModule)
    },
   ]
},
{
  path:"",
  component: LoginComponent
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
