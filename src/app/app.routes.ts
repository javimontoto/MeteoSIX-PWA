import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Componentes
import { MeteoComponent } from './components/meteo/meteo.component';


const routes: Routes = [
	{path: '', component: MeteoComponent},		//--> página principal
	{path: 'meteo', component: MeteoComponent},
	{path: '**', redirectTo:'/meteo'}		//--> cuando hay un error
];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);	//--> así carga todo.