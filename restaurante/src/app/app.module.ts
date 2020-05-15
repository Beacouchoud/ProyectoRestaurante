import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { MenusComponent } from './components/menus/menus.component';
import { JumbotronComponent } from './components/jumbotron/jumbotron.component';
import { CartaComponent } from './components/carta/carta.component';
import { APP_ROUTING } from './app.routes';
import { ContactoComponent } from './components/contacto/contacto.component';
import { PedidoComponent } from './components/pedido/pedido.component';
import { MicuentaComponent } from './pages/micuenta/micuenta.component';
import { PedidosComponent } from './components/pedidos/pedidos.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { MenuformComponent } from './components/menuform/menuform.component';
import { PlatoformComponent } from './components/platoform/platoform.component';
import { UsuarioService } from './services/usuario.service';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegistroComponent,
    NavbarComponent,
    FooterComponent,
    MenusComponent,
    JumbotronComponent,
    CartaComponent,
    ContactoComponent,
    PedidoComponent,
    MicuentaComponent,
    PedidosComponent,
    MenuformComponent,
    PlatoformComponent,
    UsuariosComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    APP_ROUTING,
    ReactiveFormsModule,
    NgSelectModule,
    FormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [
    UsuarioService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
