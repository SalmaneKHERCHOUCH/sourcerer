import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {APOLLO_OPTIONS} from 'apollo-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import {HttpLink} from 'apollo-angular/http';
import {createHttpLink, InMemoryCache} from '@apollo/client/core'
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { FirstqueryComponent } from './firstquery/firstquery.component';

const token = "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";

const uri = 'https://api.github.com/graphql'; // our GraphQL API

@NgModule({
  declarations: [
    AppComponent,
    FirstqueryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => {
        const cache = new InMemoryCache();
        return {
          link: httpLink.create({
            uri: "https://api.github.com/graphql",
            headers:new HttpHeaders().set('Authorization',`Bearer ${token}` )
          }),
          cache
        };
      },
    deps: [HttpLink],
    },
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
