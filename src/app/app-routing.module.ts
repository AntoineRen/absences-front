import { AccueilComponent } from './accueil/accueil.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthentificationComponent } from './authentification/authentification.component';


const routes: Routes = [

  { path: 'connexion', component: AuthentificationComponent},
  { path: 'accueil', component: AccueilComponent},
  { path: '**', redirectTo: '/connexion'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
