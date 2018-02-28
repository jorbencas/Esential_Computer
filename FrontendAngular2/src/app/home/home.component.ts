import { Component} from '@angular/core';
import { NgModel } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { Router, RouterStateSnapshot, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent{
  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}
 
  name: string = '';
  onSubmit(f: NgForm) {
    console.log(f.value); 
    //window.location.host= 'list/type/'+f.value.first;
    this.router.navigate(['/list/type/', f.value.first]);
  }
}
