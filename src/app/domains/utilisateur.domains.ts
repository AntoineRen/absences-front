/**
 * Utilisateur de l'application
 */
export class Utilisateur{
  email: string;
  password: string;

  constructor(params: any){
    Object.assign(this, params);
  }

  estAnonyme(){
    return this.email !== undefined;
  }
}
