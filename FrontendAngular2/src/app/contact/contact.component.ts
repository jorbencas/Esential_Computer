import { Component, OnInit,ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { NG_VALIDATORS,Validator,Validators,AbstractControl,ValidatorFn } from '@angular/forms';
import { ContactService } from '../shared';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { RouterStateSnapshot, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'contact-page',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class contactComponent implements OnInit {
 
  constructor(
    private router: Router,
    private ContactService: ContactService,
    public toastr: ToastsManager,
    private vcr: ViewContainerRef 
    ) {
      this.toastr.setRootViewContainerRef(vcr);
   }

  isSubmitting = false;
  model = {
    inputName: "",
    inputEmail: "",
    inputSubject: "",
    inputMessage: ""
  };
  
  ngOnInit() {}

  SubmitContact(){
    this.isSubmitting = true;
    var data = {"inputName": this.model.inputName, "inputEmail": this.model.inputEmail, 
    "inputSubject": this.model.inputSubject, "inputMessage": this.model.inputMessage};
    console.log(data);

    this.ContactService
    .contact(data).subscribe(

      data => { 
        this.toastr.success('Se envio correctamente','Email');
        setTimeout(() => { this.router.navigateByUrl('#/home/') }, 7000);
       },
      error => {
        setTimeout(() => { this.toastr.error('No se envio correctamente','Error') }, 3000);
      } 

    )
  }
}
