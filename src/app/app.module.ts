import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule} from '@angular/forms';
import { registerLocaleData } from '@angular/common';

// Textos (DatePipe) en español
import localeEs from '@angular/common/locales/es';
registerLocaleData(localeEs, 'es');

// Rutas
import { routing } from './app.routes';

// Pipes
import { MeteoPipe } from './pipes/meteo.pipe';

// Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { MeteoComponent } from './components/meteo/meteo.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MeteoComponent,
    MeteoPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
