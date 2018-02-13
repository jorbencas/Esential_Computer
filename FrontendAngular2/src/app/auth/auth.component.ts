import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Errors, UserService } from '../shared';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'auth-page',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit {
  authType: String = '';
  title: String = '';
  errors: Errors = new Errors();
  isSubmitting = false;
  authForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder,
    public toastr: ToastsManager,
    private vcr: ViewContainerRef 
    ) {
    // use FormBuilder to create a form group
    this.authForm = this.fb.group({
      'email': ['', Validators.required],
      'password': ['', Validators.required]
    });
    this.toastr.setRootViewContainerRef(vcr);
  }

  
  ngOnInit() {
    this.route.url.subscribe(data => {
      // Get the last piece of the URL (it's either 'login' or 'register')
      this.authType = data[data.length - 1].path;
      // Set a title for the page accordingly
      this.title = (this.authType === 'login') ? 'Sign in' : 'Sign up';
      // add form control for username if this is the register page
      if (this.authType === 'register') {
        this.authForm.addControl('username', new FormControl());
      }
    });
  }

  submitForm() {
    this.isSubmitting = true;
    this.errors = new Errors();

    const credentials = this.authForm.value;
    console.log(credentials);
    this.userService
    .attemptAuth(this.authType, credentials)
    .subscribe(
      data => {
      this.toastr.success('Se cuenta de usuario se actualizo correctamente','Bienvenido');
      setTimeout(() => { this.router.navigateByUrl('/') }, 3000);
    },
      err => {
        this.errors = err;
        setTimeout(() => { this.toastr.error(JSON.stringify(err),'Error') }, 3000);
        this.isSubmitting = false;
      }
    );
  }
}
