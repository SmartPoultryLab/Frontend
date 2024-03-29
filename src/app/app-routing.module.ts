
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './pages/dashboard';
import { AboutComponent } from './pages/about';
import { AuthGuard } from './_guard';
import { NotFoundPageComponent } from './notfoundpage';
import { RegisterComponent } from './pages/register';
import { LoginComponent } from './pages/login';
import { LoadingComponent } from './loading';


// const routes: Routes = [];

const routes: Routes = [
  {
    path: "login",
    component: RegisterComponent,
  },
  {
    path: "register",
    component: RegisterComponent,
  },
  {
    path: "loading",
    component: LoadingComponent,
  },
  {
    path: "dashboard",
    component: DashboardComponent
    , canActivate: [AuthGuard],

  },
  {
    path: "about",
    component: AboutComponent
    , canActivate: [AuthGuard]
  },
  {
    path: "farms",
    loadChildren: () =>
    import('./pages/farm/farm.module').then(m => m.FarmModule)
    , canActivate: [AuthGuard]
  },
  {
    path: "owners",
    loadChildren: () =>
    import('./pages/owners/owner.module').then(m => m.OrderModule)
    , canActivate: [AuthGuard]
  },
  {
    path: "inspections",
    loadChildren: () =>
    import('./pages/inspection/inspection.module').then(m => m.InspectionModule)
    , canActivate: [AuthGuard]
  },
  {
    path: "profile",
    loadChildren: () =>
      import('./pages/profile/profile.module').then(m => m.ProfileModule)
    , canActivate: [AuthGuard]
  },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: "**",
    component: NotFoundPageComponent
  },
  // ]
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
