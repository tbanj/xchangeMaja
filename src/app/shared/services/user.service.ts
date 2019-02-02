import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase';
import { IUser } from '../../components/user/model/user.model';
import { UserI } from '../model/user.model';

@Injectable()
export class UserService {
  constructor(private db: AngularFireDatabase) { }
  save(user: firebase.User) {
    this.db.object('/users/' + user.uid).update({
      email: user.email,
      // dis: this.getName(this.name),
    });
  }
  get(uid: string): FirebaseObjectObservable<IUser> {
    return this.db.object('/users/' + uid);
  }
  saveUserData(user: firebase.User, datas: UserI ) {
    this.db.object('/users/' + user.uid).update({
      name: datas.firstname,
      lastname: datas.lastname,
      phone: datas.phone

    });
  }

}
