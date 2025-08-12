import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { LoginComponent } from './components/login/login.component';
import { ProductGuard } from './guards/product.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { 
    path: 'productos', 
    component: ProductsComponent, 
    canMatch: [ProductGuard]
  },
  { path: '**', redirectTo: '' }
];
