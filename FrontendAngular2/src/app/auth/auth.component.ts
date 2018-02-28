import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Errors, UserService } from '../shared';
import { AuthService } from "angular2-social-login";
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
  public user;
  sub: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder,
    public toastr: ToastsManager,
    public _auth: AuthService
  ) {
    // use FormBuilder to create a form group
    this.authForm = this.fb.group({
      'email': ['', Validators.required],
      'password': ['', Validators.required]
    });
    
  }
  signIn(provider){
    console.log(provider)
    this.sub = this._auth.login(provider).subscribe(
      (data) => {
                  console.log(data);
                  this.submitSocial(data);
                  //user data 
                  //name, image, uid, provider, uid, email, token (accessToken for Facebook & google, no token for linkedIn), idToken(only for google) 
                }
    )
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
    console.log(this.authType);
    this.userService
    .attemptAuth(this.authType, credentials)
    .subscribe(
      data => {
      this.toastr.success('Se cuenta de usuario se actualizo correctamente','Bienvenido');
      this.router.navigateByUrl('/') ;
    },
      err => {
        this.errors = err;
        setTimeout(() => { this.toastr.error(JSON.stringify(err),'Error') }, 3000);
        this.isSubmitting = false;
      }
    );
  }

  submitSocial(obj) {
    this.isSubmitting = true;
    this.errors = new Errors();
    //const credentials={email:"test7@gmail.com",password:obj.uid,username:"test7"}; 
    const credentials={email:obj.email,password:obj.uid,username:obj.name.replace(" ", "")}; 
    console.log(credentials);
    console.log(this.authType);
    this.userService
    .attemptAuth(this.authType, credentials)
    .subscribe(
      data => {
      this.toastr.success('Se cuenta de usuario se actualizo correctamente','Bienvenido');
      this.router.navigateByUrl('/');
      setTimeout(() => {window.location.reload()}, 10);
    },
      err => {
        this.errors = err;
        setTimeout(() => { this.toastr.error(JSON.stringify(err),'Error') }, 3000);
        this.isSubmitting = false;
      }
    );
  }
}
