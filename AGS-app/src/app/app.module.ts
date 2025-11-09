import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContainerComponent } from './Components/container/container.component';
import { InicioComponent } from './Pages/inicio/inicio.component';
import { NosotrosComponent } from './Pages/nosotros/nosotros.component';
import { LoginComponent } from './Components/login/login.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { InicioAdminComponent } from './Pages/inicio-admin/inicio-admin.component';
import { FooterComponent } from './Components/footer/footer.component';
import { PerfilComponent } from './Pages/perfil/perfil.component';
import { PanelAdministrativoComponent } from './Pages/panel-administrativo/panel-administrativo.component';
import { MetricasComponent } from './Pages/metricas/metricas.component';
import { ServiciosProyectosComponent } from './Pages/servicios-proyectos/servicios-proyectos.component';

@NgModule({
  declarations: [
    AppComponent,
    ContainerComponent,
    InicioComponent,
    NosotrosComponent,
    LoginComponent,
    NavbarComponent,
    InicioAdminComponent,
    FooterComponent,
    PerfilComponent,
    PanelAdministrativoComponent,
    MetricasComponent,
    ServiciosProyectosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    provideClientHydration(withEventReplay())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
