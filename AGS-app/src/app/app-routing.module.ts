import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './Pages/inicio/inicio.component';
import { LoginComponent } from './Components/login/login.component';
import { ContainerComponent } from './Components/container/container.component';
import { NosotrosComponent } from './Pages/nosotros/nosotros.component';
import { InicioAdminComponent } from './Pages/inicio-admin/inicio-admin.component';

const routes: Routes = [
  { path: '', redirectTo:'AGS/inicio', pathMatch: 'full'},
  { path: "login", component: LoginComponent},
  { path: "AGS", component: ContainerComponent,
    children: [
      // { path: "login", component: LoginComponent },
      { path: "inicio", component: InicioComponent },
      { path: "nosotros", component: NosotrosComponent },
      { path: "admin", component: InicioAdminComponent }
    ]
   }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
