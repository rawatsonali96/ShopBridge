import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Path } from 'src/app/enum/path';
import { IUser } from 'src/app/model/user';
import { ApiService } from 'src/app/service/api.service';
import { UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  userExist = false;
  allUsers: IUser[];
  newUser: IUser = {id: null, name: null, email: null, password: null};
  maxId = 0;
  constructor(private router: Router, private apiService: ApiService, private userService: UserService) {
    this.registerForm = new FormGroup({
      userName: new FormControl('', [Validators.required, Validators.minLength(5)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
    console.log(this.registerForm.controls.userName);

  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
      this.apiService.get(Path.GET_ALL_USERS).subscribe((users: IUser[]) => {
        this.allUsers = users;
        var y = this.allUsers.length;
        if (this.allUsers.length > 0) {
          this.maxId = this.allUsers[0].id;
          var x = this.allUsers.filter((user) => { return user.email == this.registerForm.value.email });
          if ((this.allUsers.filter((user) => { return user.email == this.registerForm.value.email })).length == 0) {
            this.allUsers.forEach(user => {
              if (user.id > this.maxId) this.maxId = user.id;
            });
            this.newUser.id = this.maxId + 1;
            this.newUser.name = this.registerForm.value.userName;
            this.newUser.email = this.registerForm.value.email;
            this.newUser.password = this.registerForm.value.password;

            this.apiService.post(Path.GET_ALL_USERS, this.newUser).subscribe(()=>{},(err)=> {console.log(err);
            });
            this.userService.setUserExist(false);
          }
          else {
            this.userService.setUserExist(true);
            this.userExist = true;
          }
        }
      })
      this.router.navigate(['/login']);
    }
  }
}
