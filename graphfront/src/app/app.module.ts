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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatTableModule} from '@angular/material/table';




const token = "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";

const uri = 'https://api.github.com/graphql'; // our GraphQL API

@NgModule({
  declarations: [
    AppComponent,
    FirstqueryComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    MatGridListModule,
    MatTableModule
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
