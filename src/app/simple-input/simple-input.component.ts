import { Component, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { EstablishmentsService } from '../establishments.service';
import { observable } from 'rxjs/internal/symbol/observable';

@Component({
  selector: 'app-simple-input',
  templateUrl: './simple-input.component.html',
  styleUrls: ['./simple-input.component.css']
})
export class SimpleInputComponent implements OnInit {
  @Input() fieldName: string;
  constructor(private service: EstablishmentsService) { }

  ngOnInit() {
  }

  simpleSearch(term): void {
    this.service.simpleSearch([term], this.fieldName, "StartWith");
  }

}
