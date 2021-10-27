import {NgModule} from '@angular/core';
import {APOLLO_OPTIONS} from 'apollo-angular';
import {ApolloClientOptions, createHttpLink, InMemoryCache} from '@apollo/client/core';
import {HttpLink} from 'apollo-angular/http';
import { HttpHeaders } from '@angular/common/http';

const token = "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";

const uri = 'https://api.github.com/graphql'; // our GraphQL API

export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  return {
    link: createHttpLink({
      uri: 'https://api.github.com/graphql',
      headers: new HttpHeaders().set('Authorization',`Bearer ${token}` )
    }),
    cache: new InMemoryCache(),
  };
}

@NgModule({
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
