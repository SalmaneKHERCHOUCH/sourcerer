import { Component, OnInit } from '@angular/core';
import {Apollo, gql} from 'apollo-angular';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatToolbarRow} from '@angular/material/toolbar/toolbar';


@Component({
  selector: 'app-firstquery',
  templateUrl: './firstquery.component.html',
  styleUrls: ['./firstquery.component.css'],
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
