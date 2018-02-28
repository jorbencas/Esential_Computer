import { Component, OnInit } from '@angular/core';
import { Router, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { UserService } from '../shared';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from "angular2-social-login";

@Component({
  selector: 'recover-page',
  templateUrl: './recover.component.html',
  styleUrls: ['./recover.component.css']
})
export class recoverComponent implements OnInit {
  authType: String = '';
  title: String = '';
  isSubmitting = false;
  authForm: FormGroup;
  public user;
  sub: any;
  error: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private fb: FormBuilder
  ) {
    // use FormBuilder to create a form group
    this.authForm = this.fb.group({
      'email': ['', Validators.required],
    });
  }

  isAuthenticated: boolean;
  tags: Array<string> = [];
  tagsLoaded = false;
  recoveromputer: Array<Object>=[];


  ngOnInit() {
   
  }

  submitForm() {
    this.isSubmitting = true;
    const credentials = this.authForm.value;
    console.log(credentials);
    this.userService
    .recoverPass(credentials)
    .subscribe(
      data => {
      this.router.navigateByUrl('/');
      setTimeout(() => {window.location.reload()}, 10);
    },
      err => {
        this.isSubmitting = false;
      }
    );
  }
}
