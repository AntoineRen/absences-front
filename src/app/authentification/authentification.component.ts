import { AppComponent } from './../app.component';
import { AuthentificationService } from './../services/authentification.service';
import { Utilisateur } from './../domains/utilisateur.domains';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.css']
})
export class AuthentificationComponent implements OnInit {

  utilisateur: Utilisateur = new Utilisateur({});
  err = false;
  connectionReussie = false;

  constructor(private authentificationService: AuthentificationService, private router: Router) { }

  /** Envoie d'une demande de connexion au serveur */
  connecter(){

    this.authentificationService.connecter(this.utilisateur)
    .subscribe(
      utilisateur => {
        this.connectionReussie = true;
      },
      err => this.err = true
    );
  }

  ngOnInit(): void {
  }

}
