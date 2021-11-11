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
  company: string | undefined;
  totalrepository: number | undefined;
  follower: number | undefined;
  following: number | undefined;
  commit: number | undefined;
  update: string | undefined;
  imagePerso: any;
  langage: string | undefined;

  constructor(private apollo: Apollo) { }

  ngOnInit(): void {

    //On retrouve notre nom git
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

      //On retrouve la compagnie de notre github
      this.apollo
      .watchQuery({
        query: gql`
        query {
          user(login: "SalmaneKHERCHOUCH") {
            company
          }
        }
        
        `,
      })
      .valueChanges.subscribe((result: any) => {
        this.company = result?.data?.user.company;
        this.loading = result.loading;
        this.error = result.error;
      });

      //On retrouve la compagnie de notre github
      this.apollo
      .watchQuery({
        query: gql`
        query {
          user(login: "SalmaneKHERCHOUCH") {
            avatarUrl
          }
        }
        
        `,
      })
      .valueChanges.subscribe((result: any) => {
        this.imagePerso = result?.data?.user.avatarUrl;
        this.loading = result.loading;
        this.error = result.error;
      });

      //On retrouve le nombre de commit
      this.apollo
      .watchQuery({
        query: gql`
        query {
          repository(name: "learn.graphql", owner: "SalmaneKHERCHOUCH") {
            object(expression:"main") {
              ... on Commit {
                id
                history {
                  totalCount
                }
              }
            }
          }
        }
        `,
      })
      .valueChanges.subscribe((result: any) => {
        this.commit = result?.data?.repository.object.history.totalCount;
        this.loading = result.loading;
        this.error = result.error;
      });

      //On retrouve le nombre de repository total
      this.apollo
      .watchQuery({
        query: gql`
        query {
          viewer {
            repositories {
              totalCount
            }
          }
        }       
        `,
      })
      .valueChanges.subscribe((result: any) => {
        this.totalrepository = result?.data?.viewer.repositories.totalCount;
        this.loading = result.loading;
        this.error = result.error;
      });

      //On retrouve le nombre de follower
      this.apollo
      .watchQuery({
        query: gql`
        query {
          user(login: "SalmaneKHERCHOUCH") {
            followers {
              totalCount
            }
          }
        }      
        `,
      })
      .valueChanges.subscribe((result: any) => {
        this.follower = result?.data?.user.followers.totalCount;
        this.loading = result.loading;
        this.error = result.error;
      });

      //On retrouve le nombre de following
      this.apollo
      .watchQuery({
        query: gql`
        query {
          user(login: "SalmaneKHERCHOUCH") {
            following {
              totalCount
            }
          }
        }      
        `,
      })
      .valueChanges.subscribe((result: any) => {
        this.following = result?.data?.user.following.totalCount;
        this.loading = result.loading;
        this.error = result.error;
      });

      //On retrouve la derniere update
      this.apollo
      .watchQuery({
        query: gql`
        query {
          repository(name: "learn.graphql", owner: "SalmaneKHERCHOUCH") {
            updatedAt
          }
        } 
        `,
      })
      .valueChanges.subscribe((result: any) => {
        this.update = result?.data?.repository.updatedAt;
        this.loading = result.loading;
        this.error = result.error;
      });

       //On retrouve le langage du repo
       this.apollo
       .watchQuery({
         query: gql`
         query {
          repository(name: "learn.graphql", owner: "SalmaneKHERCHOUCH") {
            primaryLanguage {
              name
            }
          }
        }
         `,
       })
       .valueChanges.subscribe((result: any) => {
         this.langage = result?.data?.repository.primaryLanguage.name;
         this.loading = result.loading;
         this.error = result.error;
       });
  }

}
