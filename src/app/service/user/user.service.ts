import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IUser } from 'src/app/model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUser: BehaviorSubject<IUser> = new BehaviorSubject(null);
  userExist: BehaviorSubject<boolean> = new BehaviorSubject(false);
  constructor() { }

  setCurrentUser(user: IUser) {
    this.currentUser.next(user);
  }

  getCurrentUser() {
    return this.currentUser;
  }

  setUserExist(flag: boolean)
  {
    this.userExist.next(flag)
  }

  getUserExist() {
    return this.userExist;
  }
}
