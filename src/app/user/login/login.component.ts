import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service'; 
import { Path } from 'src/app/enum/path';
import { IUser } from 'src/app/model/user';
import { PathService } from 'src/app/service/path/path.service';
import { UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  registeredusers : IUser[] = [];
  notRegistered = false;
  constructor(private router: Router, private apiService: ApiService, private pathService: PathService, private userService: UserService) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    if(this.loginForm.valid) {
      this.apiService.get(Path.GET_ALL_USERS).subscribe((users: IUser[])=> {
        this.registeredusers = users;
        var currentUser = this.registeredusers.filter((user)=> {return user.email === this.loginForm.value.email && user.password === this.loginForm.value.password});
        if(currentUser.length > 0)
        {
          this.router.navigate(['/admin']);
          this.pathService.setCurrentPage('admin');
          this.userService.setCurrentUser(currentUser[0]);
          this.notRegistered = false;
        }
        else this.notRegistered = true;
      });
    }
  }
}
