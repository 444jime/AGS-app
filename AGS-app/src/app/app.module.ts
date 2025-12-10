import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { HttpClientModule, provideHttpClient, withInterceptors, withFetch } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { FullCalendarModule } from '@fullcalendar/angular';
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
import { authInterceptor } from './Interceptors/auth.interceptor';

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
    FormsModule,
    FullCalendarModule
  ],
  providers: [
    provideHttpClient(withFetch()),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withInterceptors([authInterceptor]))
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }