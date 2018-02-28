import { Component, OnInit,ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { NG_VALIDATORS,Validator,Validators,AbstractControl,ValidatorFn } from '@angular/forms';
import { stripeService } from '../shared';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { Errors } from '../shared';

@Component({
  selector: 'stripe-page',
  templateUrl: './stripe.component.html',
  styleUrls: ['./stripe.component.css']
})
export class stripeComponent implements OnInit {
  errors: Errors = new Errors();
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private stripeService: stripeService,
    public toastr: ToastsManager,
    private vcr: ViewContainerRef 
    ) {
      this.toastr.setRootViewContainerRef(vcr);
   }

  isSubmitting = false;
    id= 0;
    cardNumber:String;
    expiryMonth: String;
    expiryYear: String;
    cvc: String;
  
  
  ngOnInit() {
    let id;
    this.route.params.subscribe(params => {
      id = +params['id'];
      console.log(id);
     this.id = id;
    });
  }

  getToken(){

     (<any>window).Stripe.card.createToken({
      number: this.cardNumber,
      exp_month: this.expiryMonth,
      exp_year: this.expiryYear,
      cvc: this.cvc
      }, (status: number, response: any) => {
      if (status === 200) {
      let data = {stripeToken: response.id, id: this.id};
      console.log(data);
     
      this.stripeService.checkout(data).subscribe(
      message => {
      console.log('----okey')
      this.toastr.success('Tu pago se ha hecho correctamente','Success') 
      setTimeout(() => { this.router.navigateByUrl('/') }, 1000)
      },
      err => {
      console.log(err)
      this.errors = err;
      this.toastr.error('Ha habido algun problema por favor intentelo mas tarde','Error')
      this.isSubmitting = false; 
      })

      }
    })
    };

  getid(id){
    return id;
  }

}
