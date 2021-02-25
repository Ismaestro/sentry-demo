import {Component, OnInit} from '@angular/core';
import * as Sentry from "@sentry/angular";
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'sentry-demo';
  pokemonModel: string;
  pokemon: any;
  error: boolean;

  constructor(private http: HttpClient,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    Sentry.configureScope(scope => {
      scope.setUser({
        id: 'sentry-demo-user-id'
      });
    });

    Sentry.configureScope(scope => scope.setTransactionName("AppComponentLoading"));

    this.activatedRoute.queryParams.subscribe((params) => {
      const pokemonParam = params.pokemon;
      if (pokemonParam) {
        this.pokemonModel = pokemonParam;
        this.loadPokemon();
      }
    });
  }

  loadPokemon() {
    this.http.get(`https://pokeapi.co/api/v2/pokemon/${this.pokemonModel}`).subscribe((pokemon) => {
      this.pokemon = pokemon;
      this.error = false;
      const urlTree = this.router.parseUrl(this.router.url);
      urlTree.queryParams['pokemon'] = this.pokemonModel;
      this.router.navigateByUrl(urlTree);
    }, () => {
      this.pokemon = null;
      this.error = true;
    });
  }

  sendError() {
    const a = [];
    const b = a[0][1]; // :S
  }
}
