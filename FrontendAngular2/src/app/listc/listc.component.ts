import { Component, OnInit } from '@angular/core';
import { Router, RouterStateSnapshot, ActivatedRoute } from '@angular/router';

import { ArticleListConfig, TagsService, UserService, DinosaurService} from '../shared';

@Component({
  selector: 'listc-page',
  templateUrl: './listc.component.html',
  styleUrls: ['./listc.component.css']
})
export class listcComponent implements OnInit {
 
  error: any;
  constructor(
    private router: Router,
    private tagsService: TagsService,
    private userService: UserService,
    private dinosaurService: DinosaurService,
    private route: ActivatedRoute
  ) {}

  isAuthenticated: boolean;
  listConfig: ArticleListConfig = new ArticleListConfig();
  tags: Array<string> = [];
  tagsLoaded = false;
  listComputer: Array<Object>=[];


  ngOnInit() {
    console.log(this.route.url)
    let type;
    this.route.params.subscribe(params => {
      type = params['id'];
      if(type){
        this.dinosaurService.getTypeDinos(type)
        .subscribe(dino => {
          let computer=dino;
          this.listComputer.push(computer);
          console.log(dino);
        });
      }else{
        this.dinosaurService.getDinos()
        .subscribe(dino => {
          let computer=dino;
          this.listComputer.push(computer);
          console.log(computer);
        });
    }
   });
  }
}
