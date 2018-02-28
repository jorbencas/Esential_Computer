import { Component, OnInit,  ViewChild} from '@angular/core';
import { Router, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import  {TagsService, UserService, DinosaurService} from '../shared';
import { MouseEvent } from '@agm/core';


@Component({
  selector: 'details-page',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})


export class detailsComponent implements OnInit {
  /*lat: number = 51.678418;
  lng: number = 7.809007;*/
  
    
  error: any;
  constructor(
    private router: Router,
    private tagsService: TagsService,
    private userService: UserService,
    private dinosaurService: DinosaurService,
    private route: ActivatedRoute,
    //private mapsManager:MapsManager
  ) {}

  isAuthenticated: boolean;
  tags: Array<string> = [];
  tagsLoaded = false;
  listComputer: Array<Object>=[];

  ngOnInit() {
    let shoparr=[];
    let id;
    this.route.params.subscribe(params => {
      id = +params['id'];
      console.log(id);
      this.dinosaurService.getOneDinos(id)
      .subscribe(dino => {
        JSON.parse(dino.shop).forEach(function(element){
          shoparr.push({name:element.name,latitude:parseFloat(element.latitude),longitude:parseFloat(element.longitude),stock:parseInt(element.stock)}) 
        });
        let computer={
          id:id,
          picture:dino.picture,
          name:dino.name,
          date:dino.date,
          marca:dino.marca,
          status:dino.status,
          type:dino.type,
          description:dino.description,
          shop:shoparr
        }
        console.log(computer);
        this.listComputer.push(computer);
      });
   });
  }
}
