import { Component, OnInit } from '@angular/core';
import {Apollo, gql} from 'apollo-angular';

@Component({
  selector: 'app-firstquery',
  template: `
    <div *ngIf="loading">
      Loading...
    </div>
    <div *ngIf="error">
      Error :(
    </div>
    <h1>{{login}}</h1>
  `,
})
export class FirstqueryComponent implements OnInit {

  login: string | undefined;
  loading = true;
  error: any;

  constructor(private apollo: Apollo) { }

  ngOnInit(): void {
    this.apollo
      .watchQuery({
        query: gql`
        query { 
          viewer { 
            login
          }
        }
        `,
      })
      .valueChanges.subscribe((result: any) => {
        this.login = result?.data?.viewer.login;
        this.loading = result.loading;
        this.error = result.error;
      });

  }

}
