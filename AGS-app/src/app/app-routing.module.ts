import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './Pages/inicio/inicio.component';
import { LoginComponent } from './Components/login/login.component';
import { ContainerComponent } from './Components/container/container.component';
import { NosotrosComponent } from './Pages/nosotros/nosotros.component';
import { InicioAdminComponent } from './Pages/inicio-admin/inicio-admin.component';
import { PerfilComponent } from './Pages/perfil/perfil.component';
import { PanelAdministrativoComponent } from './Pages/panel-administrativo/panel-administrativo.component';
import { MetricasComponent } from './Pages/metricas/metricas.component';
import { ServiciosProyectosComponent } from './Pages/servicios-proyectos/servicios-proyectos.component';

const routes: Routes = [
  { path: '', redirectTo:'AGS/inicio', pathMatch: 'full'},
  { path: "login", component: LoginComponent},
  { path: "AGS", component: ContainerComponent,
    children: [
      { path: "inicio", component: InicioComponent },
      { path: "nosotros", component: NosotrosComponent },
      { path: "admin", component: InicioAdminComponent },
      { path: "perfil", component: PerfilComponent },
      { path: "panel", component: PanelAdministrativoComponent},
      { path: "metricas", component: MetricasComponent},
      { path: "servicios-proyectos", component: ServiciosProyectosComponent}
    ]
   }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { 
      anchorScrolling: 'enabled',
      scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
