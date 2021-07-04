import { Component, OnInit } from '@angular/core';
import { IUser } from './model/user';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { PathService } from './service/path/path.service';
import { UserService } from './service/user/user.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ShopBridge';
  currentUrl: string;
  currentUser: IUser;
  constructor( private router: Router, private pathService: PathService, private userService: UserService) {

  }

  ngOnInit() {
    this.router.navigate(['']);
    this.pathService.getCurrentPage().subscribe((res)=> {
      this.currentUrl = res;
      this.userService.getCurrentUser().subscribe((user)=> {
        this.currentUser = user;
      })
    })
  }

  logout() {
    this.router.navigate(['']);
    this.userService.setCurrentUser(null);
    this.currentUser = null;
  }
}
