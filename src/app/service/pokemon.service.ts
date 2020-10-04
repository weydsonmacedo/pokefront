import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs';

@Injectable()
export class PokemonService {
  PATH = "pokemon/?offset=0&limit=1050";
  constructor(public http: HttpClient) { }

  getPokemonList() {
    return this.http.get(environment.baseUrl + this.PATH)
    .map((response: any) => response)
    .catch(async (e) => console.error(e));
  }

}
