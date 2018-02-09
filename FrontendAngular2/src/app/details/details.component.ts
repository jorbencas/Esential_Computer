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
   
    let id;
    this.route.params.subscribe(params => {
      id = +params['id'];
      console.log(id);
      this.dinosaurService.getOneDinos(id)
      .subscribe(dino => {
        //let computer=dino;
        let computer={
          picture:dino.picture,
          name:dino.name,
          date:dino.date,
          marca:dino.marca,
          status:dino.status,
          type:dino.type,
          description:dino.description,
          shop:[{name:"App Informática Pius XII",latitude:38.7834605,longitude:-0.6071565,stock:7},
          {name:"Worten",latitude:39.2456342,longitude:-0.7275889,stock:6}]
        }
        console.log(computer);
        this.listComputer.push(computer);
      });
   });
  }
}
