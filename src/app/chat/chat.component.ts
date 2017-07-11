import { Component, OnInit, ViewChildren, AfterViewInit } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { User } from '../../models/user.interface';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, AfterViewInit {
  @ViewChildren('textInput') textInput;
  messageText: string = '';

  loggedInUser: User;
  users: FirebaseListObservable<any>;
  messages: FirebaseListObservable<any>;
  scrollTop: number = 0;

  constructor(
    private af: AngularFireAuth,
    private db: AngularFireDatabase, 
    private router: Router) {
  }

  ngAfterViewInit() {
    this.textInput.first.nativeElement.focus();
    this.getAndSetUser(this.af.auth.currentUser.uid);
  }

  ngOnInit() {
    this.users = this.db.list('users');
    this.messages = this.db.list('messages');
  }

  scrollToBottom() {
    this.scrollTop = document.getElementById('scroll').scrollHeight;
  }

  openUserMessages(user: User) {
    this.router.navigate(['/profile', user.id]);
  }

  sendMessage() {
    const ref = this.db.database.ref('messages');
    ref.push({
      uid: this.loggedInUser.id,
      sender: this.loggedInUser.name,
      senderImage: this.loggedInUser.image,
      text: this.messageText,
      dateAdded: (new Date()).getTime()
    })
    .then(() => {
      this.messageText = '';
      this.textInput.first.nativeElement.focus();
    })
    .catch(err => {
      console.error(err);
      alert(err.message);
    });
  }

  async logout() {
    const result = await this.af.auth.signOut();
    this.router.navigate(['login']);
  }

  async getAndSetUser(uid: string) {
    this.db.object(`users/${uid}`).subscribe(snap => {
       this.loggedInUser = snap;
    });
  }

}