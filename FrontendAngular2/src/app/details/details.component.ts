import { Component, OnInit } from '@angular/core';
import { Router, RouterStateSnapshot, ActivatedRoute } from '@angular/router';

import  {TagsService, UserService, DinosaurService} from '../shared';

@Component({
  selector: 'details-page',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class detailsComponent implements OnInit {
 
  error: any;
  constructor(
    private router: Router,
    private tagsService: TagsService,
    private userService: UserService,
    private dinosaurService: DinosaurService,
    private route: ActivatedRoute
  ) {}

  isAuthenticated: boolean;
  tags: Array<string> = [];
  tagsLoaded = false;
  listComputer: Array<Object>=[];



  ngOnInit() {
    let id;
    this.route.params.subscribe(params => {
      id = +params['id'];
      console.log(id);
      this.dinosaurService.getOneDinos(id)
      .subscribe(dino => {
        let computer=dino;
        this.listComputer.push(computer);
        console.log(dino);
      });
   });
  }
}
