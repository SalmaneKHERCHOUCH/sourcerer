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
  user:any = [] ;
  loading = true;
  error: any;
  company: string | undefined;
  totalrepository: number | undefined;
  follower: number | undefined;
  following: number | undefined;
  commit:any = [];
  update: string | undefined;
  imagePerso: any;
  langage1: string | undefined;
  langage2: string | undefined;
  langage3: string | undefined;
  langage4: string | undefined;
  dataSource: any;

  repository:any = [];

  displayedColumns: string[] = ['repository', 'commits', 'langage'];

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
          user(login: "SalmaneKHERCHOUCH") {
            repositories(first: 100, privacy: PUBLIC) {
              totalCount
              nodes {
                defaultBranchRef {
                  target {
                    ... on Commit {
                      history {
                        totalCount
                      }
                    }
                  }
                }
              }
            }
          }
        }
        `,
      })
      .valueChanges.subscribe((result: any) => {
        this.user = result?.data?.user;
        for(let i=0; i< Object.keys(this.user["repositories"]["nodes"]).length; i++) {
          this.commit.push(this.user["repositories"]["nodes"][i]["defaultBranchRef"]["target"]["history"]["totalCount"])
        } 
        this.commit = eval(this.commit.join("+"));
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
         this.langage1 = result?.data?.repository.primaryLanguage.name;
         this.loading = result.loading;
         this.error = result.error;
       });

       this.apollo
       .watchQuery({
         query: gql`
         query {
          repository(name: "hi-python", owner: "SalmaneKHERCHOUCH") {
            primaryLanguage {
              name
            }
          }
        }
         `,
       })
       .valueChanges.subscribe((result: any) => {
         this.langage2 = result?.data?.repository.primaryLanguage.name;
         this.loading = result.loading;
         this.error = result.error;
       });

       this.apollo
       .watchQuery({
         query: gql`
         query {
          repository(name: "sourcerer", owner: "SalmaneKHERCHOUCH") {
            primaryLanguage {
              name
            }
          }
        }
         `,
       })
       .valueChanges.subscribe((result: any) => {
         this.langage3 = result?.data?.repository.primaryLanguage.name;
         this.loading = result.loading;
         this.error = result.error;
       });

       this.apollo
       .watchQuery({
         query: gql`
         query {
          repository(name: "efre-mdfs-python-alexandry", owner: "SalmaneKHERCHOUCH") {
            primaryLanguage {
              name
            }
          }
        }
         `,
       })
       .valueChanges.subscribe((result: any) => {
         this.langage4 = result?.data?.repository.primaryLanguage.name;
         this.loading = result.loading;
         this.error = result.error;
       });

       this.apollo
       .watchQuery({
         query: gql`
         query {
          user(login: "SalmaneKHERCHOUCH") {
            repositories(first: 100, privacy: PUBLIC) {
              nodes {
                name
              }
            }
          }
        }
         `,
       })
       .valueChanges.subscribe((result: any) => {

        for(let i=0; i< Object.keys(this.user["repositories"]["nodes"]).length; i++) {
          this.repository.push(this.user["repositories"]["nodes"][i]["name"]);
          console.log("Le nom des repositories", this.user["repositories"]["nodes"][i]["name"]);
        }
         this.loading = result.loading;
         this.error = result.error;
         
       });
  }

}
