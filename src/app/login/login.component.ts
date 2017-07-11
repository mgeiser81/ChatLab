import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private af: AngularFireAuth,
    private db: AngularFireDatabase,
    private router: Router
  ) { }

  ngOnInit() {
    if (this.af.auth.currentUser) {
      this.router.navigate(['/']);
    }
  }

  async login() {
    const result = await this.af.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    
    if (result.user) {
      await this.addUser({
        id: result.user.uid,
        name: result.user.displayName,
        email: result.user.email,
        image: result.user.photoURL
      });
      this.router.navigate(['/']);
    }
  }

  async addUser(user) {
    return new Promise((resolve, reject) => {
      this.db.database.ref(`/users/${user.id}`)
        .set(user)
        .then(() => resolve())
        .catch(err => reject(err));
    });
  }

}