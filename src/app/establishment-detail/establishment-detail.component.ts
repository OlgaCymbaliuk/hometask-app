import { Component, OnInit } from '@angular/core';
import { EstablishmentsService } from 'src/app/establishments.service';
import { EstablishmentDetail } from 'src/app/establishment-detail';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-establishment-detail',
  templateUrl: './establishment-detail.component.html',
  styleUrls: ['./establishment-detail.component.css'],
  providers: [EstablishmentsService]
})
export class EstablishmentDetailComponent implements OnInit {

  current$: Observable<EstablishmentDetail>;
  constructor(private service: EstablishmentsService, private route: ActivatedRoute, private location: Location) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.current$ = this.service.getDetailById(id);
  }

  goBack(): void {
    this.location.back();
  }

}
