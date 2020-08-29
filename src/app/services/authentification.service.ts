import { environment } from './../../environments/environment';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Utilisateur } from './../domains/utilisateur.domains';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, tap} from 'rxjs/operators';

const UTILISATEUR_ANONYME = new Utilisateur({});

/**
 * Service gérant l'authentification
 */
@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  /**
   * Subject transmettant l'information de l'utilisateur connecté, initialisé avec un utilisateur anonyme
   *
   * @private
   * @type {BehaviorSubject<Utilisateur>}
   * @memberof AuthentificationService
   */
  private subjectUtilisateurConnecte: BehaviorSubject<Utilisateur> = new BehaviorSubject(UTILISATEUR_ANONYME);

  constructor(private http: HttpClient) { }

  /** Connexion de l'utilisateur */
  connecter(utilisateur: Utilisateur): Observable<Utilisateur>{

    const config = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post(`${environment.baseUrl}auth`,
    JSON.stringify(utilisateur), config)
    .pipe(
      map(utilisateurServeur => new Utilisateur(utilisateurServeur)),
      tap(user => this.subjectUtilisateurConnecte.next(user))
    );
  }

  /** Deconnexion de l'utilisateur */
  seDeconnecter(){
    const config = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };

    return this.http.post<Utilisateur>(`${environment.baseUrl}logout`, null , config)
      .pipe(
        tap(col => this.subjectUtilisateurConnecte.next(UTILISATEUR_ANONYME))
      );
  }
}
