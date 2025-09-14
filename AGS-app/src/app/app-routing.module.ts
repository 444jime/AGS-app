import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './Pages/inicio/inicio.component';
import { LoginComponent } from './Components/login/login.component';
import { ContainerComponent } from './Components/container/container.component';
import { NosotrosComponent } from './Pages/nosotros/nosotros.component';

const routes: Routes = [
  { path: "", component: InicioComponent },
  { path: "login", component: LoginComponent },
  { path: "AGS", component: ContainerComponent,
    children: [
      { path: "inicio", component: InicioComponent },
      { path: "nosotros", component: NosotrosComponent }
    ]
   }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
