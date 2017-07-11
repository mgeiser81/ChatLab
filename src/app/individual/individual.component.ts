import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from '../../models/user.interface';

@Component({
  selector: 'app-individual',
  templateUrl: './individual.component.html',
  styleUrls: ['./individual.component.scss']
})
export class IndividualComponent implements OnInit {

  userId: string;
  profile: User;
  messages: any[];

  constructor(
    private af: AngularFireAuth,
    private db: AngularFireDatabase,
    private activatedRoute: ActivatedRoute, 
    private router: Router
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.fetchUser(params['id'])
        .then(user => {
          this.profile = user;
          this.fetchMessages();
        })
        .catch(err => {
          console.error(err);
        });
    });
  }

  async fetchUser(key: string): Promise<any> { 
    return new Promise((resolve, reject) => {
      this.db.object(`/users/${key}`).subscribe(result => {
        resolve(result);
      }, error => {
        reject(error);
      });
    });
  }

  async fetchMessages() {

    this.db.list('/messages', {
      query: {
        orderByChild: 'uid',
        equalTo: this.profile.id
      }
    }).subscribe(snap => {
      this.messages = snap;
    });
  }

  async logout() {
    const result = await this.af.auth.signOut();
    this.router.navigate(['login']);
  }

  backToChat() {
    this.router.navigate(['/']);
  }

}